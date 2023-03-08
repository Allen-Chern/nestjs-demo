import { Type } from '@nestjs/common';

export const plainToModel = <T, OmitKeys extends keyof T = never>(
  cls: Type<T>,
  plain: Omit<T, OmitKeys>,
): T => {
  const object = new cls();
  Object.assign(object as any, plain);

  return object;
};

export const plainToDb = <T>(cls: Type<T>, plain: Partial<T>): T => {
  const object = new cls();
  Object.assign(object as any, plain);

  return object;
};
