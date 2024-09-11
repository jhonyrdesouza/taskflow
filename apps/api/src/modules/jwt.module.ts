import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtService } from 'src/services/jwt.service';

@Module({
  imports: [
    NestJwtModule.register({
      privateKey: process.env.JWT_PRIVATE_KEY,
      publicKey: process.env.JWT_PUBLIC_KEY,
      signOptions: {
        algorithm: 'RS256',
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        expiresIn: process.env.JWT_ACCESS_TOKEN_TTL,
      },
    }),
  ],
  exports: [JwtService],
  providers: [JwtService],
})
export class JwtModule {}
