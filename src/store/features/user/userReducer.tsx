import { User, UseUsersResult } from "@/utils/interface";

// Action Types
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST" as const;
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS" as const;
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE" as const;

// Action Creators
export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users: User[]) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error: string) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

// Define Action Types
type UsersAction =
  | ReturnType<typeof fetchUsersRequest>
  | ReturnType<typeof fetchUsersSuccess>
  | ReturnType<typeof fetchUsersFailure>;

// Initial State
const initialState: UseUsersResult = {
  users: [],
  loading: true,
  error: null,
};

// Users Reducer
const usersReducer = (
  state = initialState,
  action: UsersAction
): UseUsersResult => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
