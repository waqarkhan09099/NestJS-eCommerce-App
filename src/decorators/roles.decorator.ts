import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/Roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(process.env.ROLES_KEY, roles);