import { generate } from 'generate-password';

export const generateUnguessable = (length = 20) =>
  generate({ length, numbers: true, strict: true });
