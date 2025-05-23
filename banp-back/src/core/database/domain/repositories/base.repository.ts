import {
  DataSource,
  DataSourceOptions,
  QueryRunner,
  Repository,
} from 'typeorm';
import BaseEntity from '../entities/base.entity';
import NeoConnection from '../connection/neo.connection';

export default abstract class BaseRepository<T extends BaseEntity> {
  public manager: Repository<T>;

  public async transaction<T>(query: (queryRunner: QueryRunner) => Promise<T>) {
    const source = new DataSource(
      new NeoConnection().getConnection() as DataSourceOptions,
    );
    await source.initialize();
    const queryRunner = source.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await query(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
      await source.destroy();
    }
  }
}
