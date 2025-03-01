import type { GetKakaoUserProfileRequestDto } from '../../kakao/dtos/get-kakao-user-profile.dto';

export type GetNaverUserProfileRequestDto = GetKakaoUserProfileRequestDto;

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
