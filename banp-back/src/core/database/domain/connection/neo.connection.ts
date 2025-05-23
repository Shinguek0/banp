import { ConfigService } from '@nestjs/config';
import Connection from '../class/connection.class';
import { EConnection } from '../enum/connection.enum';

export default class NeoConnection extends Connection {
  public constructor(config?: ConfigService) {
    super(EConnection.NEOANALITYCS, config);
  }
}
