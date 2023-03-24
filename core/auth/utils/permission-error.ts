import { ForbiddenException } from '@nestjs/common';

export const PERMISSION_ERROR = new ForbiddenException('PermissionError', 'User not activate yet.');
