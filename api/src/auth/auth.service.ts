import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { OwnerService } from 'src/owner/owner.service';

@Injectable()
export class AuthService {
  constructor(
    private ownerService: OwnerService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const owner = await this.ownerService.findByEmail(email);
    // owner not found
    if (!owner) {
      throw new BadRequestException('Wrong credentials');
    }
    // Compare password
    const isPasswordMatching = await bcrypt.compare(password, owner.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }
    delete owner.password;
    return owner;
  }

  async login(owner: any) {
    const tokens = await this.getTokens(owner.id, owner.email);
    await this.updateRefreshToken(owner.id, tokens.refreshToken);
    // const payload = { email: owner.email, sub: owner.id };
    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async register(registerDto: RegisterDto) {
    return await this.ownerService.create(registerDto);
  }

  async refreshToken(refreshToken: string, ownerId: string) {
    const owner = await this.ownerService.findOne(ownerId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      owner.refreshToken,
    );
    if (!isRefreshTokenMatching) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(owner.id, owner.email);
    await this.updateRefreshToken(owner.id, tokens.refreshToken);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async logout(ownerId: string) {
    return this.ownerService.update(ownerId, { refreshToken: null });
  }

  async hashData(data: string) {
    return await bcrypt.hash(data, await bcrypt.genSalt(10));
  }

  async updateRefreshToken(ownerId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.ownerService.update(ownerId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(ownerId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: ownerId,
          email: email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: ownerId,
          email: email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_EXPIRATION_TIME',
          ),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
