import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { appConfig } from '@/common/options/config.options';
import type { ConfigType } from '@nestjs/config';
import type {
  GetNaverAuthTokenRequestDto,
  GetNaverAuthTokenResponseDto,
} from './dtos/get-naver-auth-token.dto';
import type {
  GetNaverUserProfileRequestDto,
  GetNaverUserProfileResponseDto,
} from './dtos/get-naver-user-profile.dto';

@Injectable()
export class OAuthNaverService {
  constructor(
    @Inject(appConfig.KEY)
    private config: ConfigType<typeof appConfig>
  ) {}

  async naverLogin({ code, state }: GetNaverAuthTokenRequestDto) {
    const { access_token } = await this.getNaverAuthToken({
      code,
      state,
    });

    const userProfile = await this.getNaverUserProfile({
      accessToken: access_token,
    });

    return userProfile;
  }

  private async getNaverAuthToken({
    code,
    state,
  }: GetNaverAuthTokenRequestDto) {
    const { data } = await axios<GetNaverAuthTokenResponseDto>({
      url: 'https://nid.naver.com/oauth2.0/token',
      method: 'GET',
      params: {
        grant_type: 'authorization_code',
        client_id: this.config.naverClientId,
        client_secret: this.config.naverClientSecret,
        code,
        state,
      },
    });
    return data;
  }

  private async getNaverUserProfile({
    accessToken,
  }: GetNaverUserProfileRequestDto) {
    const { data } = await axios<GetNaverUserProfileResponseDto>({
      url: 'https://openapi.naver.com/v1/nid/me',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'text/json;charset=utf-8',
      },
    });
    console.log(data);
    return data;
  }
}
