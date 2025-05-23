import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecomendationSystem1719282711490 implements MigrationInterface {
  name = 'AddRecomendationSystem1719282711490';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "questions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "title" character varying NOT NULL, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id")); COMMENT ON COLUMN "questions"."id" IS 'Código de identificação do registro'; COMMENT ON COLUMN "questions"."created_at" IS 'Data de criação do registro'; COMMENT ON COLUMN "questions"."updated_at" IS 'Data de atualização do registro'; COMMENT ON COLUMN "questions"."deleted_at" IS 'Data de deleção do registro'`,
    );
    await queryRunner.query(
      `CREATE TABLE "answers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "question_id" integer, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id")); COMMENT ON COLUMN "answers"."id" IS 'Código de identificação do registro'; COMMENT ON COLUMN "answers"."created_at" IS 'Data de criação do registro'; COMMENT ON COLUMN "answers"."updated_at" IS 'Data de atualização do registro'; COMMENT ON COLUMN "answers"."deleted_at" IS 'Data de deleção do registro'; COMMENT ON COLUMN "answers"."question_id" IS 'Código de identificação do registro'`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")); COMMENT ON COLUMN "categories"."id" IS 'Código de identificação do registro'; COMMENT ON COLUMN "categories"."created_at" IS 'Data de criação do registro'; COMMENT ON COLUMN "categories"."updated_at" IS 'Data de atualização do registro'; COMMENT ON COLUMN "categories"."deleted_at" IS 'Data de deleção do registro'`,
    );
    await queryRunner.query(
      `CREATE TABLE "answer_categories" ("answer_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_ae64b81ca928b5291111362113a" PRIMARY KEY ("answer_id", "category_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f57153a7fd9be8255b8c1c7fdc" ON "answer_categories" ("answer_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ef971b44001bf3df2b2d83a6ce" ON "answer_categories" ("category_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_profile" ("category_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_10e96a8bfa0079fa4dfadfdf35d" PRIMARY KEY ("category_id", "user_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9724f41a33e2dad2f92f15b7b6" ON "user_profile" ("category_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_eee360f3bff24af1b689076520" ON "user_profile" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_desire" ("category_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_e0bfb68fc6aecb76a5bc5c4a674" PRIMARY KEY ("category_id", "user_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_04d12d0874caa73413f5861b58" ON "user_desire" ("category_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_53ebc3ece5033e2db407cd07d2" ON "user_desire" ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "answers" ADD CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer_categories" ADD CONSTRAINT "FK_f57153a7fd9be8255b8c1c7fdc7" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer_categories" ADD CONSTRAINT "FK_ef971b44001bf3df2b2d83a6ce6" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" ADD CONSTRAINT "FK_9724f41a33e2dad2f92f15b7b6b" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" ADD CONSTRAINT "FK_eee360f3bff24af1b6890765201" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_desire" ADD CONSTRAINT "FK_04d12d0874caa73413f5861b588" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_desire" ADD CONSTRAINT "FK_53ebc3ece5033e2db407cd07d29" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_desire" DROP CONSTRAINT "FK_53ebc3ece5033e2db407cd07d29"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_desire" DROP CONSTRAINT "FK_04d12d0874caa73413f5861b588"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" DROP CONSTRAINT "FK_eee360f3bff24af1b6890765201"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" DROP CONSTRAINT "FK_9724f41a33e2dad2f92f15b7b6b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer_categories" DROP CONSTRAINT "FK_ef971b44001bf3df2b2d83a6ce6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer_categories" DROP CONSTRAINT "FK_f57153a7fd9be8255b8c1c7fdc7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "answers" DROP CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_53ebc3ece5033e2db407cd07d2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_04d12d0874caa73413f5861b58"`,
    );
    await queryRunner.query(`DROP TABLE "user_desire"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_eee360f3bff24af1b689076520"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9724f41a33e2dad2f92f15b7b6"`,
    );
    await queryRunner.query(`DROP TABLE "user_profile"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ef971b44001bf3df2b2d83a6ce"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f57153a7fd9be8255b8c1c7fdc"`,
    );
    await queryRunner.query(`DROP TABLE "answer_categories"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "answers"`);
    await queryRunner.query(`DROP TABLE "questions"`);
  }
}
