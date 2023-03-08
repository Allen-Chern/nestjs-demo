import { EnvVariableNotSetError } from '@@common/misc/env-variable-not-set-error';
import type { NonNilProps } from '@@common/misc/non-nil-props-type';

const {
  NODE_ENV,
  PORT,
  ACCESS_JWT_SECRET,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DATABASE,
} = process.env;

const _envs = {
  NODE_ENV,
  PORT,
  ACCESS_JWT_SECRET,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DATABASE,
};

Object.entries(_envs).forEach(([key, value]) => {
  if (!(key in process.env)) {
    throw new EnvVariableNotSetError(key);
  }

  _envs[key as keyof typeof _envs] = (value as string)
    .replace(/\\n/gi, '\n')
    .replace(/(^"|"$)/gi, '');

  if (
    _envs.NODE_ENV !== 'test' &&
    _envs.NODE_ENV !== 'development' &&
    _envs.NODE_ENV !== 'staging' &&
    _envs.NODE_ENV !== 'production'
  ) {
    throw new Error(`Unrecognized NODE_ENV value: ${_envs.NODE_ENV}`);
  }
});

const envs = _envs as NonNilProps<typeof _envs> & {
  NODE_ENV: 'test' | 'development' | 'staging' | 'production';
};

export { envs };
