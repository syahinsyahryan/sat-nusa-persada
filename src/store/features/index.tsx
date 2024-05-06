import { combineReducers } from "redux";
import usersReducer from "./user/userReducer"; // Import your user reducer here
// Import any other reducers you may have

// Combine Reducers
const rootReducer = combineReducers({
  users: usersReducer,
  // Add more reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
