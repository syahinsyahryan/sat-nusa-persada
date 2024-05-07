import { combineReducers } from "redux";
import usersReducer from "./user/userReducer";

const rootReducer = combineReducers({
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
