import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGender1719295610227 implements MigrationInterface {
  name = 'AddGender1719295610227';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "gender" character varying NOT NULL DEFAULT 'M'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
  }
}
