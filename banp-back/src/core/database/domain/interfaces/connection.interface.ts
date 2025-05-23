import { EConnection } from '../enum/connection.enum';

export default interface IConnection {
  type: EConnection;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}
