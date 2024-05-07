import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/api";
import { User, UseUsersResult } from "@/utils/interface";
import { Dispatch } from "redux";

// Action Types
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST" as const;
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS" as const;
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE" as const;

// Action Creators
const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

const fetchUsersSuccess = (users: User[]) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

const fetchUsersFailure = (error: string) => ({
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

// Reducer
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

// Custom Hook
export const useGetUsers = (): UseUsersResult => {
  const dispatch = useDispatch<Dispatch<UsersAction>>();
  const { users, loading, error } = useSelector(
    (state: any) => state.users
  ) as UseUsersResult;

  useEffect(() => {
    dispatch(fetchUsersRequest());
    getUser()
      .then((response) => {
        dispatch(fetchUsersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(
          fetchUsersFailure("Failed to fetch users. Please try again later.")
        );
      });
  }, [dispatch]);

  return { users, loading, error };
};

export default usersReducer;
