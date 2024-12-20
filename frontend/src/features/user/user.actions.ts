import { createAction } from "@reduxjs/toolkit";
import { UserIdPayload } from "./user.types";

export const addId = createAction<UserIdPayload>("user/addId");
