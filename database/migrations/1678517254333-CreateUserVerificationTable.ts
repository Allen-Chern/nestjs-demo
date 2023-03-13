import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserVerificationTable1678517254333 implements MigrationInterface {
  name = 'CreateUserVerificationTable1678517254333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_verifications" ("id" uuid NOT NULL, "userId" uuid NOT NULL, "invalidatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3269a92433d028916ab342b94fb" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_verifications"`);
  }
}
