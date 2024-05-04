import { useEffect, useState } from "react";
import { getUser } from "@/api";
import { UseUsersResult, User } from "@/utils/interface";
import { AxiosResponse } from "axios";

export const useGetUsers = (): UseUsersResult => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<User[]> = await getUser();
        setUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return { users, loading, error };
};
