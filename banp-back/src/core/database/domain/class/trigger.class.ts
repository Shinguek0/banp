import { MigrationInterface, QueryRunner } from 'typeorm';

export default abstract class Trigger implements MigrationInterface {
  public name?: string;
  public constructor(
    private nameTrigger: string,
    private nameTable: string,
    private type: 'before' | 'after',
    private action: 'update' | 'insert' | 'delete',
    private uniqueField?: string,
    private schema?: string,
  ) {
    if (!this.schema) {
      this.schema = 'public';
    }
  }

  public abstract query(): string;

  public async up(queryRunner: QueryRunner) {
    await queryRunner.query(`
    CREATE OR REPLACE FUNCTION ${this.schema}.fn_${this.nameTrigger}()
        RETURNS trigger
        LANGUAGE plpgsql
    AS $function$
    BEGIN
        ${this.query()}
        RETURN NEW;
    END;
    $function$;
    `);
    await queryRunner.query(`
    CREATE TRIGGER tr_${this.nameTrigger}
    ${this.type.toUpperCase()} ${this.action.toUpperCase()}
    ${
      this.uniqueField
        ? `OF ${this.uniqueField} ON ${this.schema}.${this.nameTable}`
        : ` ON ${this.schema}.${this.nameTable}`
    }
    FOR EACH ROW EXECUTE FUNCTION fn_${this.nameTrigger}();
    `);
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.query(`
    DROP TRIGGER tr_${this.nameTrigger} ON ${this.nameTable};
    `);
    await queryRunner.query(`
    DROP FUNCTION fn_${this.nameTrigger}();
    `);
  }
}
