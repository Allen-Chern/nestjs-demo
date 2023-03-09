import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1678267959382 implements MigrationInterface {
  name = 'CreateUserTable1678267959382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL, "email" character varying NOT NULL, "hashedPassword" character varying, "name" character varying NOT NULL, "providerType" "public"."provider_type" NOT NULL, "openId" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
