import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserTable1678517137095 implements MigrationInterface {
  name = 'AlterUserTable1678517137095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "activatedAt" TIMESTAMP WITH TIME ZONE`);
    await queryRunner.query(`ALTER TABLE "users" ADD "isActivate" boolean NOT NULL DEFAULT true`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActivate" DROP DEFAULT`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "activatedAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActivate"`);
  }
}
