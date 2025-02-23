import { Module } from '@nestjs/common';
import { OauthModule } from './oauth/oauth.module';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './common/options/config.options';
import { FirebaseModule } from './firebase/firebase.module';
import { FcmModule } from './firebase/fcm/fcm.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    OauthModule,
    FirebaseModule,
    FcmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
