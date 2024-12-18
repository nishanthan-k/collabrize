import { UserIdEnum } from "../../lib/global/types/global.types";

export interface UserState {
  userId: number | null;
  empId: number | null;
  orgId: number | null;
}

export interface UserIdPayload {
  key: UserIdEnum;
  value: number;
}
