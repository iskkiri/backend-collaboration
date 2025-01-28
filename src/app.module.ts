import { Module } from '@nestjs/common';
import { OauthModule } from './oauth/oauth.module';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './common/options/config.options';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), OauthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
