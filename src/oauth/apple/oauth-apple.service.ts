import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ApplePublicKey, GetApplePublicKeysResponseDto } from './dtos/get-apple-public-keys.dto';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { AppleTokenPayload } from './types/apple-token-payload.types';
import { ConfigType } from '@nestjs/config';
import { appConfig } from '@/common/options/config.options';
import { GetAppleIdentityTokenRequestDto } from './dtos/get-apple-identity-token.dto';
import { isRSAKey } from './types/json-web-key.types';

@Injectable()
export class OAuthAppleService {
  constructor(
    @Inject(appConfig.KEY)
    private config: ConfigType<typeof appConfig>
  ) {}

  async appleLogin({ identityToken, nonce }: GetAppleIdentityTokenRequestDto) {
    // identityToken 검증
    const payload = await this.verifyIdentityToken({ identityToken, nonce });
    console.log('payload', payload);

    // 사용자 ID (sub) 추출
    const appleUserId = payload.sub;

    if (!appleUserId) {
      throw new UnauthorizedException('Invalid Apple user ID');
    }

    return payload;
  }

  /**
   * identityToken 검증
   */
  private async verifyIdentityToken({
    identityToken,
    nonce,
  }: GetAppleIdentityTokenRequestDto): Promise<AppleTokenPayload> {
    // 1. 토큰에서 헤더 부분 추출하여 디코딩
    // JWT는 'header.payload.signature' 으로 이루어져 있음
    const tokenParts = identityToken.split('.');
    if (tokenParts.length !== 3) {
      throw new UnauthorizedException('Invalid token format');
    }

    // 헤더 부분은 Base64로 인코딩되어 있기 때문에,
    // 1. Buffer 클래스를 사용하여 Base64 문자열을 이진 데이터(버퍼)로 변환
    // 2. 변환된 이진 데이터를 UTF-8 인코딩 방식으로 문자열로 변환
    const headerJSON = Buffer.from(tokenParts[0], 'base64').toString('utf8');
    const header = JSON.parse(headerJSON);

    // 2. 애플 공개키 조회
    const keys = await this.getApplePublicKeys();

    // 3. 토큰 헤더의 kid와 일치하는 키 찾기
    const key = keys.find((k) => k.kid === header.kid);
    if (!key) {
      throw new UnauthorizedException('Invalid token key ID');
    }
    if (!isRSAKey(key)) {
      throw new UnauthorizedException('Invalid token key type');
    }

    // 4. JWK(Json Web Key)를 PEM 형식으로 변환
    const publicKey = jwkToPem(key);

    // 5. 토큰 검증
    try {
      const decodedToken = jwt.verify(identityToken, publicKey, {
        algorithms: ['RS256'], // 애플은 RS256 알고리즘 사용
        issuer: 'https://appleid.apple.com',
        audience: this.config.appleClientId, // 애플 개발자 포털에 등록된 앱 ID
        nonce,
      }) as AppleTokenPayload;

      return decodedToken;
    } catch (error) {
      console.error('Token verification error:', error);
      throw new UnauthorizedException('Token verification failed');
    }
  }

  /**
   * 애플 공개키 조회
   */
  private async getApplePublicKeys(): Promise<ApplePublicKey[]> {
    try {
      const { data } = await axios.get<GetApplePublicKeysResponseDto>(
        'https://appleid.apple.com/auth/keys'
      );

      return data.keys;
    } catch (error) {
      console.error('Error fetching Apple public keys:', error);
      throw new UnauthorizedException('Failed to fetch Apple public keys');
    }
  }
}
