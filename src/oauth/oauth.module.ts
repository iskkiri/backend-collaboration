import { Module } from '@nestjs/common';
import { OAuthKakaoModule } from './kakao/oauth-kakao.module';
import { OAuthNaverModule } from './naver/oauth-naver.module';
import { OauthController } from './oauth.controller';

@Module({
  imports: [OAuthKakaoModule, OAuthNaverModule],
  controllers: [OauthController],
})
export class OAuthModule {}
