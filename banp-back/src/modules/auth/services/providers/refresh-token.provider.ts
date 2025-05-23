import { JwtService } from '@nestjs/jwt';

export default class RefreshTokenProvider {
  public constructor(private readonly jwtService: JwtService) {}
  public async execute(token: string) {
    const data = await this.jwtService.decode(token);
    const userId = data.id;
    const payload = { id: userId };

    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
