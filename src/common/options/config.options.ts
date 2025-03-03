import { ConfigModuleOptions, ConfigType, registerAs } from '@nestjs/config';
import { z } from 'zod';

export const appConfig = registerAs('app', () => ({
  port: process.env.PORT,
  kakaoClientId: process.env.KAKAO_CLIENT_ID,
  kakaoClientSecret: process.env.KAKAO_CLIENT_SECRET,
  naverClientId: process.env.NAVER_CLIENT_ID,
  naverClientSecret: process.env.NAVER_CLIENT_SECRET,
  googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  appleClientId: process.env.APPLE_CLIENT_ID,
}));
export type AppConfig = ConfigType<typeof appConfig>;

export const configModuleOptions = {
  isGlobal: true,
  envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production',
  validate: z.object({
    PORT: z.coerce.number(),

    KAKAO_CLIENT_ID: z.string(),
    KAKAO_CLIENT_SECRET: z.string(),

    NAVER_CLIENT_ID: z.string(),
    NAVER_CLIENT_SECRET: z.string(),

    GOOGLE_APPLICATION_CREDENTIALS: z.string(),

    APPLE_CLIENT_ID: z.string(),
  }).parse,
  load: [appConfig],
} satisfies ConfigModuleOptions;
