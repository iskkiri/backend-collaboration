import { Module } from '@nestjs/common';
import { OAuthNaverService } from './oauth-naver.service';

@Module({
  providers: [OAuthNaverService],
  exports: [OAuthNaverService],
})
export class OAuthNaverModule {}
