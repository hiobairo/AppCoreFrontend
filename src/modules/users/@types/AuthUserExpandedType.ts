import { AuthUser } from '@hiobairo/app-core';
import { LocationType } from '../../locations/@types/LocationType';

export type AuthUserExpandedType = AuthUser & {
  location?: LocationType;
}