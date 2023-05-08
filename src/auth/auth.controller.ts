import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignInDTO } from './dtos/sign-in.dto';

@Controller('api/auth')
export class AuthController {
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(@Body() body: SignInDTO) {
    return 'Logado com sucesso!';
  }
}
