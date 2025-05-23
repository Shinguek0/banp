import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseTables1719275270231 implements MigrationInterface {
  name = 'BaseTables1719275270231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "games" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id")); COMMENT ON COLUMN "games"."id" IS 'Código de identificação do registro'; COMMENT ON COLUMN "games"."created_at" IS 'Data de criação do registro'; COMMENT ON COLUMN "games"."updated_at" IS 'Data de atualização do registro'; COMMENT ON COLUMN "games"."deleted_at" IS 'Data de deleção do registro'`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_signup" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "firebase_id" character varying NOT NULL, CONSTRAINT "PK_362808bb8414f7297c7f0430fb8" PRIMARY KEY ("id")); COMMENT ON COLUMN "users_signup"."id" IS 'Código de identificação do registro'; COMMENT ON COLUMN "users_signup"."created_at" IS 'Data de criação do registro'; COMMENT ON COLUMN "users_signup"."updated_at" IS 'Data de atualização do registro'; COMMENT ON COLUMN "users_signup"."deleted_at" IS 'Data de deleção do registro'`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "image" character varying NOT NULL, "birth_date" TIMESTAMP NOT NULL, "signup_id" integer, CONSTRAINT "REL_362808bb8414f7297c7f0430fb" UNIQUE ("signup_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."id" IS 'Código de identificação do registro'; COMMENT ON COLUMN "users"."created_at" IS 'Data de criação do registro'; COMMENT ON COLUMN "users"."updated_at" IS 'Data de atualização do registro'; COMMENT ON COLUMN "users"."deleted_at" IS 'Data de deleção do registro'; COMMENT ON COLUMN "users"."signup_id" IS 'Código de identificação do registro'`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_games" ("game_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_a0c46573b2eeb903a867999c159" PRIMARY KEY ("game_id", "user_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_52610929b0f86d508a20769bd9" ON "user_games" ("game_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9432b81f913c6e29e539103898" ON "user_games" ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_362808bb8414f7297c7f0430fb8" FOREIGN KEY ("signup_id") REFERENCES "users_signup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_games" ADD CONSTRAINT "FK_52610929b0f86d508a20769bd9a" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_games" ADD CONSTRAINT "FK_9432b81f913c6e29e5391038981" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_games" DROP CONSTRAINT "FK_9432b81f913c6e29e5391038981"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_games" DROP CONSTRAINT "FK_52610929b0f86d508a20769bd9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_362808bb8414f7297c7f0430fb8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9432b81f913c6e29e539103898"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_52610929b0f86d508a20769bd9"`,
    );
    await queryRunner.query(`DROP TABLE "user_games"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "users_signup"`);
    await queryRunner.query(`DROP TABLE "games"`);
  }
}
