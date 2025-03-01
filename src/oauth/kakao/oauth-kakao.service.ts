import axios from 'axios';
import { Inject, Injectable } from '@nestjs/common';
import { appConfig } from '@/common/options/config.options';
import type { ConfigType } from '@nestjs/config';
import type {
  GetKakaoAuthTokenRequestDto,
  GetKakaoAuthTokenResponseDto,
} from './dtos/get-kakao-auth-token.dto';
import type {
  GetKakaoUserProfileRequestDto,
  GetKakaoUserProfileResponseDto,
} from './dtos/get-kakao-user-profile.dto';

@Injectable()
export class OAuthKakaoService {
  constructor(
    @Inject(appConfig.KEY)
    private config: ConfigType<typeof appConfig>
  ) {}

  async kakaoLogin({ code, redirectUri }: GetKakaoAuthTokenRequestDto) {
    const { access_token } = await this.getKakaoAuthToken({
      code,
      redirectUri,
    });

    const userProfile = await this.getKakaoUserProfile({
      accessToken: access_token,
    });
    console.log(userProfile);

    return userProfile;
  }

  private async getKakaoAuthToken({
    code,
    redirectUri,
  }: GetKakaoAuthTokenRequestDto) {
    const { data } = await axios<GetKakaoAuthTokenResponseDto>({
      url: 'https://kauth.kakao.com/oauth/token',
      method: 'POST',
      data: {
        grant_type: 'authorization_code',
        client_id: this.config.kakaoClientId,
        client_secret: this.config.kakaoClientSecret,
        code,
        redirect_uri: redirectUri,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    return data;
  }

  private async getKakaoUserProfile({
    accessToken,
  }: GetKakaoUserProfileRequestDto) {
    const { data } = await axios<GetKakaoUserProfileResponseDto>({
      url: 'https://kapi.kakao.com/v2/user/me',
      method: 'POST',
      data: {
        property_keys: ['kakao_account.email', 'kakao_acount.profile.nickname'],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    console.log(data);
    return data;
  }
}
