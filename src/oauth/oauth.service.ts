import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import type {
  GetKakaoAuthTokenRequestDto,
  GetKakaoAuthTokenResponseDto,
} from './dtos/getKakaoAuthToken.dto';
import type {
  GetKakaoUserProfileRequestDto,
  GetKakaoUserProfileResponseDto,
} from './dtos/getKakaoUserProfile.dto';
import type {
  GetNaverAuthTokenRequestDto,
  GetNaverAuthTokenResponseDto,
} from './dtos/getNaverAuthToken.dto';
import type {
  GetNaverUserProfileRequestDto,
  GetNaverUserProfileResponseDto,
} from './dtos/getNaverUserProfile.dto';
import { appConfig } from '@/common/options/config.options';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class OauthService {
  constructor(
    @Inject(appConfig.KEY)
    private config: ConfigType<typeof appConfig>
  ) {}

  async getKakaoAuthToken({ code }: GetKakaoAuthTokenRequestDto) {
    const { data } = await axios<GetKakaoAuthTokenResponseDto>({
      url: 'https://kauth.kakao.com/oauth/token',
      method: 'POST',
      data: {
        grant_type: 'authorization_code',
        client_id: this.config.kakaoClientId,
        redirect_uri: 'http://localhost:3000/oauth/callback/kakao',
        code,
        client_secret: this.config.kakaoClientSecret,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    return data;
  }

  async getKakaoUserProfile({ accessToken }: GetKakaoUserProfileRequestDto) {
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

  async getNaverAuthToken({ code, state }: GetNaverAuthTokenRequestDto) {
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

  async getNaverUserProfile({ accessToken }: GetNaverUserProfileRequestDto) {
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
