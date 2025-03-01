import { Body, Controller, Post } from '@nestjs/common';
import { OAuthKakaoService } from './kakao/oauth-kakao.service';
import { OAuthNaverService } from './naver/oauth-naver.service';
import { OAuthAppleService } from './apple/oauth-apple.service';
import { GetKakaoAuthTokenRequestDto } from './kakao/dtos/get-kakao-auth-token.dto';
import { GetNaverAuthTokenRequestDto } from './naver/dtos/get-naver-auth-token.dto';
import { GetAppleIdentityTokenRequestDto } from './apple/dtos/get-apple-identity-token.dto';

@Controller('oauth')
export class OauthController {
  constructor(
    private readonly oauthKakaoService: OAuthKakaoService,
    private readonly oauthNaverService: OAuthNaverService,
    private readonly oauthAppleService: OAuthAppleService
  ) {}

  @Post('kakao')
  kakaoLogin(@Body() body: GetKakaoAuthTokenRequestDto) {
    return this.oauthKakaoService.kakaoLogin(body);
  }

  @Post('naver')
  naverLogin(@Body() body: GetNaverAuthTokenRequestDto) {
    return this.oauthNaverService.naverLogin(body);
  }

  @Post('apple')
  appleLogin(@Body() body: GetAppleIdentityTokenRequestDto) {
    return this.oauthAppleService.appleLogin(body);
  }
}
