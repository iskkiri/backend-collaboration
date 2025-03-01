export interface GetKakaoPublicKeyResponseDto {
  keys: KakaoPublicKey[];
}

export interface KakaoPublicKey {
  kid: string;
  kty: string;
  alg: string;
  use: string;
  n: string;
  e: string;
}
