import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './common/options/config.options';
import { FirebaseModule } from './firebase/firebase.module';
import { FcmModule } from './firebase/fcm/fcm.module';
import { OAuthModule } from './oauth/oauth.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    OAuthModule,
    FirebaseModule,
    FcmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
