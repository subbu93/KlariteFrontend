import {Roles} from './roles.enum';

export class User {
  id: bigint;
  osuId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  costCenterId: number;
  costCenterName: string;
  businessUnitId: number;
  businessUnitName: string;
  url: string;
  trainer: boolean;
  trainingAttended: boolean;
  token: string;
  role: Roles;
}
