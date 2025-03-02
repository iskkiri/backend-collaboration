import { Body, Controller, Post } from '@nestjs/common';
import { OAuthKakaoService } from './kakao/oauth-kakao.service';
import { OAuthNaverService } from './naver/oauth-naver.service';
import { OAuthAppleService } from './apple/oauth-apple.service';
import { GetKakaoAuthTokenRequestDto } from './kakao/dtos/get-kakao-auth-token.dto';
import { GetNaverAuthTokenRequestDto } from './naver/dtos/get-naver-auth-token.dto';
import { GetAppleIdentityTokenRequestDto } from './apple/dtos/get-apple-identity-token.dto';
import { NaverUserInfo } from './naver/dtos/get-naver-user-info.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetKakaoUserInfoResponseDto } from './kakao/dtos/get-kakao-user-info.dto';
import { AppleTokenPayload } from './apple/types/apple-token-payload.types';

@ApiTags('OAuth')
@Controller('oauth')
export class OauthController {
  constructor(
    private readonly oauthKakaoService: OAuthKakaoService,
    private readonly oauthNaverService: OAuthNaverService,
    private readonly oauthAppleService: OAuthAppleService
  ) {}

  @ApiOperation({ summary: '카카오 로그인' })
  @ApiOkResponse({ type: GetKakaoUserInfoResponseDto })
  @Post('kakao')
  kakaoLogin(@Body() body: GetKakaoAuthTokenRequestDto): Promise<GetKakaoUserInfoResponseDto> {
    return this.oauthKakaoService.kakaoLogin(body);
  }

  @ApiOperation({ summary: '네이버 로그인' })
  @ApiOkResponse({ type: NaverUserInfo })
  @Post('naver')
  naverLogin(@Body() body: GetNaverAuthTokenRequestDto): Promise<NaverUserInfo> {
    return this.oauthNaverService.naverLogin(body);
  }

  @ApiOperation({ summary: '애플 로그인' })
  @ApiOkResponse({ type: AppleTokenPayload })
  @Post('apple')
  appleLogin(@Body() body: GetAppleIdentityTokenRequestDto): Promise<AppleTokenPayload> {
    return this.oauthAppleService.appleLogin(body);
  }
}
