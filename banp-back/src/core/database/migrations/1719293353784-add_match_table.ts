import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMatchTable1719293353784 implements MigrationInterface {
  name = 'AddMatchTable1719293353784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "matches" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "response" character varying NOT NULL, "user_id" integer, "user_meeting_id" integer, CONSTRAINT "PK_8a22c7b2e0828988d51256117f4" PRIMARY KEY ("id")); COMMENT ON COLUMN "matches"."id" IS 'Código de identificação do registro'; COMMENT ON COLUMN "matches"."created_at" IS 'Data de criação do registro'; COMMENT ON COLUMN "matches"."updated_at" IS 'Data de atualização do registro'; COMMENT ON COLUMN "matches"."deleted_at" IS 'Data de deleção do registro'; COMMENT ON COLUMN "matches"."user_id" IS 'Código de identificação do registro'; COMMENT ON COLUMN "matches"."user_meeting_id" IS 'Código de identificação do registro'`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_8b8c5bf13af6eeaad84d0f56a78" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_1c851f4c8db5571a18511c8903c" FOREIGN KEY ("user_meeting_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "matches" DROP CONSTRAINT "FK_1c851f4c8db5571a18511c8903c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" DROP CONSTRAINT "FK_8b8c5bf13af6eeaad84d0f56a78"`,
    );
    await queryRunner.query(`DROP TABLE "matches"`);
  }
}
