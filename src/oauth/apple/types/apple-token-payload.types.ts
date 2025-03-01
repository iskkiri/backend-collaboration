export interface AppleTokenPayload {
  iss: string; // 발급자 (애플 서버)
  aud: string; // 앱 ID (애플 개발자 포털에 등록된 앱 ID)
  exp: number; // 만료 시간
  iat: number; // 발급 시간
  sub: string; // 사용자 ID (애플에서 제공하는 고유 식별자)
  nonce?: string; // Number used Once => CSRF 공격 방지, Replay Attack 방지
  c_hash: string;
  email?: string; // 이메일 (사용자가 공유 허용한 경우)
  email_verified?: boolean; // 이메일 인증 여부
  auth_time: number;
  nonce_supported: boolean;
  real_user_status?: number;
}
