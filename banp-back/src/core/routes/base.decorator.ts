import { Controller, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/domain/guards/authGuard.guard';

export default abstract class BaseDecorator {
  private name: string;
  private route: string;
  public constructor({ route, name }: { route: string; name: string }) {
    this.name = name;
    this.route = route;
  }

  public abstract base();

  protected controller(suffix?: string) {
    const route = suffix ? `${this.route}/${suffix}` : this.route;
    return applyDecorators(Controller(route), ApiTags(this.name));
  }

  protected login() {
    return applyDecorators(UseGuards(AuthGuard), ApiBearerAuth());
  }
}
