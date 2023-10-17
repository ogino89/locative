import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { OwnerService } from 'src/owner/owner.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private ownerService: OwnerService,
  ) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req, @Body() _loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const owner = await this.authService.register(registerDto);
    return owner;
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  async refresh(@Request() req) {
    return await this.authService.refreshToken(
      req.user.refreshToken,
      req.user.sub,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('logout')
  logout(@Request() req) {
    this.authService.logout(req.user.id);
  }

  @ApiBearerAuth()
  @Get('/me')
  @UseGuards(JwtGuard)
  async user(@Request() req) {
    const owner = await this.ownerService.findOne(req.user.id);
    delete owner.password;
    return owner;
  }
}
