import type { GetKakaoUserInfoRequestDto } from '../../kakao/dtos/get-kakao-user-info.dto';

export type GetNaverUserInfoRequestDto = GetKakaoUserInfoRequestDto;

export interface GetNaverUserInfoResponseDto {
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
