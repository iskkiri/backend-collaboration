import { Module } from '@nestjs/common';
import { OAuthAppleService } from './oauth-apple.service';

@Module({
  providers: [OAuthAppleService],
  exports: [OAuthAppleService],
})
export class OAuthAppleModule {}
