import { Injectable } from '@nestjs/common';
import SignInAuthProvider from './providers/sign-in.auth.provider';
import UserRepository from 'src/modules/user/domain/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import RefreshTokenProvider from './providers/refresh-token.provider';

@Injectable()
export default class AuthService {
  public signIn: SignInAuthProvider;
  public refresh: RefreshTokenProvider;
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
    this.signIn = new SignInAuthProvider(this.userRepository, this.jwtService);
    this.refresh = new RefreshTokenProvider(this.jwtService);
  }
}
