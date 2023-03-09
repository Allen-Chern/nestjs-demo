import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLoginRecordTable1678267966921 implements MigrationInterface {
  name = 'CreateLoginRecordTable1678267966921';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "login_records" ("id" SERIAL NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7d7b2428dc07f6bf2332e8f6f7f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "login_records"`);
  }
}
