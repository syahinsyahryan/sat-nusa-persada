import { deleteUser } from "@/api";

export const useDeleteUser = (): ((id: number) => Promise<void>) => {
  return async (id: number) => {
    try {
      await deleteUser(id);
    } catch (error) {
      throw new Error("Failed to delete user. Please try again later.");
    }
  };
};
