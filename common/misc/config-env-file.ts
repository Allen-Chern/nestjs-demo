import { config } from 'dotenv';
import { join } from 'path';

export const configEnvFile = (path: string) => config({ path: join(process.cwd(), path) });
