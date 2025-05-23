import { DataSource, DataSourceOptions } from 'typeorm';

import NeoConnection from './neo.connection';
import 'dotenv/config';

const dataSource = new DataSource(
  new NeoConnection().getConnection() as DataSourceOptions,
);

export default dataSource;
