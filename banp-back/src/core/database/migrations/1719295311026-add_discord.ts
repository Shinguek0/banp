import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDiscord1719295311026 implements MigrationInterface {
    name = 'AddDiscord1719295311026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "discord" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "discord"`);
    }

}
