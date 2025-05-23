import { Global, Module } from '@nestjs/common';
import UserModule from '../user/user.module';
import AuthService from './services/auth.service';
import BaseAuthController from './routes/controllers/base.auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './domain/guards/authGuard.guard';

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('PASSWORD_SECRET'),
          signOptions: { expiresIn: '2d' },
        };
      },
    }),
  ],
  controllers: [BaseAuthController],
  providers: [AuthService, AuthGuard],
  exports: [
    AuthGuard,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('PASSWORD_SECRET'),
          signOptions: { expiresIn: '2d' },
        };
      },
    }),
    UserModule,
  ],
})
export default class AuthModule {}
