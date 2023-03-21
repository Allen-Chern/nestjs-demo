import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterLoginRecordTable1679382376100 implements MigrationInterface {
  name = 'AlterLoginRecordTable1679382376100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_records" ADD CONSTRAINT "FK_5de29151fa57bff599298df0bf3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_records" DROP CONSTRAINT "FK_5de29151fa57bff599298df0bf3"`,
    );
  }
}
