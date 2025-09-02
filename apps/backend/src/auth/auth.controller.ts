import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginResponseDto, UserDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOkResponse({ type: LoginResponseDto })
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = this.authService.generateToken(req.user);

    res.cookie('Authentication', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });

    const response: LoginResponseDto = {
      message: 'Login success',
      user: req.user,
    };

     return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/users`);

  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  async getProfile(@Req() req): Promise<UserDto> {
    console.log(req.user,'req.user')
    return req.user;
  }

@Get('logout')
logout(@Res() res: Response) {
  res.clearCookie('Authentication', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  });
  return res.status(200).json({ message: 'Logged out successfully' });
}
}
