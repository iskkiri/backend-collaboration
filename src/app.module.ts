import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './common/options/config.options';
import { FirebaseModule } from './firebase/firebase.module';
import { FcmModule } from './firebase/fcm/fcm.module';
import { OAuthModule } from './oauth/oauth.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), OAuthModule, FirebaseModule, FcmModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // https://docs.nestjs.com/migration-guide#express-v5
    consumer.apply(LoggerMiddleware).forRoutes('{*splat}');
  }
}
