import { Module } from '@nestjs/common';
import { OAuthKakaoService } from './oauth-kakao.service';

@Module({
  providers: [OAuthKakaoService],
  exports: [OAuthKakaoService],
})
export class OAuthKakaoModule {}
