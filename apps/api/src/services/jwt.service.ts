import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async encode(user: User) {
    const { cuid, fullname, email, permissions } = user;
    return await this.jwtService.signAsync({
      cuid,
      fullname,
      email,
      permissions,
    });
  }

  async decode(token: string) {
    return await this.jwtService.verifyAsync(token);
  }
}
