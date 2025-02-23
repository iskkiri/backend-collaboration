import { ConfigModuleOptions, registerAs } from '@nestjs/config';
import Joi from 'joi';

export const appConfig = registerAs('app', () => ({
  port: process.env.PORT,
  kakaoClientId: process.env.KAKAO_CLIENT_ID,
  kakaoClientSecret: process.env.KAKAO_CLIENT_SECRET,
  naverClientId: process.env.NAVER_CLIENT_ID,
  naverClientSecret: process.env.NAVER_CLIENT_SECRET,
  googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
}));

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath:
    process.env.NODE_ENV === 'development'
      ? '.env.development'
      : '.env.production',
  validationSchema: Joi.object({
    PORT: Joi.number().required(),

    KAKAO_CLIENT_ID: Joi.string().required(),
    KAKAO_CLIENT_SECRET: Joi.string().required(),

    NAVER_CLIENT_ID: Joi.string().required(),
    NAVER_CLIENT_SECRET: Joi.string().required(),

    GOOGLE_APPLICATION_CREDENTIALS: Joi.string().required(),
  }),
  load: [appConfig],
};
