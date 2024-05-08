import { useEffect, useState } from "react";
import { getUser } from "@/api";
import { UseUsersResult, User } from "@/utils/interface";
import { AxiosResponse } from "axios";

export const useGetUsers = (
  currentPage: number,
  pageSize: number
): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalData, setTotalData] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<User[]> = await getUser(
          currentPage,
          pageSize
        );
        const headers = response.headers;
        const totalCount = headers.get("X-Total-Count");
        const parsedData = response.data.map((each: User) => ({
          id: each.id,
          username: each.username,
          name: each.name,
          email: each.email,
          phone: each.phone,
        }));
        setTotalData(totalCount);
        setUsers(parsedData);
      } catch (error) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [currentPage, pageSize]);

  return { users, loading, error };
};
