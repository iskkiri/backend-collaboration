import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OAuthKakaoModule } from './kakao/oauth-kakao.module';
import { OAuthNaverModule } from './naver/oauth-naver.module';
import { OAuthAppleModule } from './apple/oauth-apple.module';

@Module({
  imports: [OAuthKakaoModule, OAuthNaverModule, OAuthAppleModule],
  controllers: [OauthController],
})
export class OAuthModule {}
