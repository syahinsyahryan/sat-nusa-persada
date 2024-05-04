import { editUser } from "@/api";
import { User } from "@/utils/interface";

export const useEditUser = (): ((payload: User) => Promise<void>) => {
  return async (payload: User) => {
    try {
      await editUser(payload);
    } catch (error) {
      throw new Error("Failed to edit user. Please try again later.");
    }
  };
};
