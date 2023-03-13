import { DataSource, QueryRunner } from 'typeorm';

export class Transaction {
  public queryRunner: QueryRunner;

  private _shouldRollback = false;

  private _onCommited = [] as (() => any)[];

  public setRollback() {
    this._shouldRollback = true;
  }

  public get shouldRollback() {
    return this._shouldRollback;
  }

  public pushOnCommited(callback: () => any) {
    this._onCommited.push(callback);
  }

  public get onCommited() {
    return this._onCommited;
  }

  constructor(dataSource: DataSource) {
    this.queryRunner = dataSource.createQueryRunner();
  }
}

export const runTransaction =
  (dataSource: DataSource) =>
  async <T>(runInTransaction: (transaction: Transaction) => Promise<T>): Promise<T> => {
    const transaction = new Transaction(dataSource);

    await transaction.queryRunner.connect();
    await transaction.queryRunner.startTransaction();

    try {
      const result = await runInTransaction(transaction);

      if (transaction.shouldRollback) {
        await transaction.queryRunner.rollbackTransaction();

        return result;
      }

      await transaction.queryRunner.commitTransaction();

      transaction.onCommited.forEach((callback) => {
        callback();
      });

      return result;
    } catch (error) {
      await transaction.queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await transaction.queryRunner.release();
    }
  };
