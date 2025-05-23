import { QueryRunner } from 'typeorm';

export default class Migration {
  public static async createTable(
    {
      table,
      schema,
      description,
    }: {
      table: string;
      schema?: string;
      description: string;
    },
    queryRunner: QueryRunner,
  ) {
    await queryRunner.manager.query(
      `COMMENT ON TABLE ${schema ?? 'public'}.${table} IS '${description}'`,
    );
    await queryRunner.manager.query(`
    CREATE TRIGGER update_${table}_modtime BEFORE UPDATE ON ${table} FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
    `);
  }
}
