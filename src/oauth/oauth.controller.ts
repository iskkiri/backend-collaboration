import { Body, Controller, Post } from '@nestjs/common';
import { GetKakaoAuthTokenRequestDto } from './kakao/dtos/get-kakao-auth-token.dto';
import { OAuthKakaoService } from './kakao/oauth-kakao.service';
import { OAuthNaverService } from './naver/oauth-naver.service';
import { GetNaverAuthTokenRequestDto } from './naver/dtos/get-naver-auth-token.dto';

@Controller('oauth')
export class OauthController {
  constructor(
    private readonly oauthKakaoService: OAuthKakaoService,
    private readonly oauthNaverService: OAuthNaverService
  ) {}

  @Post('kakao')
  kakaoLogin(@Body() body: GetKakaoAuthTokenRequestDto) {
    return this.oauthKakaoService.kakaoLogin(body);
  }

  @Post('naver')
  naverLogin(@Body() body: GetNaverAuthTokenRequestDto) {
    return this.oauthNaverService.naverLogin(body);
  }
}
