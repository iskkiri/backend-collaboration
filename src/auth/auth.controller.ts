import { PortoneService } from './../portone/portone.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  VerifyIdentityRequestDto,
  VerifyIdentityResponseDto,
} from './../portone/dtos/verify-identity.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly portoneService: PortoneService) {}

  @ApiOperation({
    summary: '인증 정보 조회',
    description:
      '본인 인증 완료 이후 획득한 identityVerificationId를 이용하여 고객 인증 정보를 조회합니다.',
  })
  @ApiOkResponse({ type: VerifyIdentityResponseDto })
  @HttpCode(HttpStatus.OK)
  @Post('verify-identity')
  async verifyIdentity(@Body() body: VerifyIdentityRequestDto) {
    return this.portoneService.verifyIdentity(body.identityVerificationId);
  }
}
