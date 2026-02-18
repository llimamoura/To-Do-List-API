import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import { Public } from '../shared/decorators/is-public.decorator.js';
import { RefreshTokenGuard } from './guards/auth_RefreshToken.guards.js';
import * as requestTypes from '../shared/types/request.types.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Public()
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Public()
  @Post('refresh')
  refresh(@Req() req: requestTypes.RefreshRequest) {
    return this.authService.refresh(req.user.userId, req.user.refreshToken);
  }

  @Post('logout')
  logout(@Req() req: requestTypes.AuthenticatedRequest) {
    return this.authService.logout(req.user.userId);
  }
}
