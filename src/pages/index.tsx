import Page from "@/components/wrapper/Page";
import { useEffect } from "react";
import { Typography, Stack, Button } from "@mui/material";
import { useGetUsers } from "@/hooks/useGetUser";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { User } from "@/utils/interface";

export default function Home() {
  const { users, loading, error } = useGetUsers();
  console.log("🚀 ~ Home ~ users:", users)
  const deleteUser = useDeleteUser();

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }
  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <Page title="Home Page">
      <Typography>Ini home page</Typography>
      <Stack>
        {users &&
          users.map((user) => (
            <>
              <Stack key={user.id}>
                <Typography>{user.name}</Typography>
                <Typography>{user.email}</Typography>
              </Stack>
              <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
            </>
          ))}
      </Stack>
    </Page>
  );
}
