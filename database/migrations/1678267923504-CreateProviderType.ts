import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProviderType1678267923504 implements MigrationInterface {
  name = 'CreateProviderType1678267923504';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."provider_type" AS ENUM('BASIC', 'FACEBOOK', 'GOOGLE')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE "public"."provider_type"`);
  }
}
