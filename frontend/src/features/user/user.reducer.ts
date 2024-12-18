import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { UserIdPayload, UserState } from "./user.types";
import { addId } from "./user.actions";

const initialState: UserState = {
  userId: null,
  empId: null,
  orgId: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addId, (state, action: PayloadAction<UserIdPayload>) => {
      const { key, value } = action.payload;
      state[key] = state[key] ? state[key] + 1 : value;
    });
});

export default userReducer;
