export interface KakaoTokenPayload {
  aud: string;
  sub: string;
  auth_time: number;
  iss: string;
  exp: number;
  iat: number;
  nonce: string;
  // 동의항목에 따라 반환되는 정보가 다름
  nickname?: string;
  picture?: string;
  email?: string;
}
