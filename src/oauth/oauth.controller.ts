import { Body, Controller, Post } from '@nestjs/common';
import { OauthService } from './oauth.service';
import type { GetKakaoUserProfileRequestDto } from './dtos/getKakaoUserProfile.dto';
import type { GetNaverUserProfileRequestDto } from './dtos/getNaverUserProfile.dto';

@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Post('kakao')
  kakaoLoginForMobileApp(@Body() body: GetKakaoUserProfileRequestDto) {
    return this.oauthService.getKakaoUserProfile(body);
  }

  @Post('naver')
  naverLoginForMobileApp(@Body() body: GetNaverUserProfileRequestDto) {
    return this.oauthService.getNaverUserProfile(body);
  }
}
