import type { GetKakaoUserProfileRequestDto } from './getKakaoUserProfile.dto';

export interface GetNaverUserProfileRequestDto
  extends GetKakaoUserProfileRequestDto {}

export interface GetNaverUserProfileResponseDto {
  resultcode: string;
  message: string;
  response: NaverUserInfo;
}

interface NaverUserInfo {
  id: string;
  nickname: string;
  name: string;
  email: string;
  gender: string;
  age: string;
  birthday: string;
  profile_image: string;
  birthyear: string;
  mobile: string;
}
