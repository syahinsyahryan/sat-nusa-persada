import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  IconButton,
  Box,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import {
  IconEdit,
  IconEye,
  IconDeviceFloppy,
  IconTrash,
} from "@tabler/icons-react";

import { TableContent } from "@/components/base/table";
import { useGetUsers } from "@/hooks/useGetUser";
import { User } from "@/utils/interface";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useEditUser } from "@/hooks/useEditUser";
import { deleteUser, editUser } from "@/api";

const emptyTicket = "/assets/images/ticket-client/empty_ticket.png";
interface UserListContentProps {
  users: User[];
}
const UserListContent: React.FC<UserListContentProps> = ({ users }) => {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleEditSubmit = (updatedUserData: User) => {
    console.log("Updated User Data:", updatedUserData);
    editUser(updatedUserData);
    handleCloseEditModal();
  };
  const handleDeleteUser = () => {
    if (selectedUser) {
      console.log("Deleted User:", selectedUser.id);
      deleteUser(selectedUser.id);
      handleCloseEditModal();
    }
  };
  const renderEditModal = (
    <Modal open={editModalOpen} onClose={handleCloseEditModal}>
      <Box
        sx={{
          position: "absolute",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Edit User
        </Typography>
        {selectedUser && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditSubmit(selectedUser);
            }}
          >
            <TextField
              label="UserName"
              value={selectedUser.username}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, username: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Name"
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              value={selectedUser.phone}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, phone: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button type="submit" variant="contained">
                <IconDeviceFloppy />
                Save
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteUser}
              >
                <IconTrash />
                Delete
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Modal>
  );

  const renderOptions = {
    text: "Actions",
    show: true,
    render: (user: User) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          justifyContent: "center",
        }}
      >
        <IconButton
          sx={{ bgcolor: "orange", borderRadius: "6px" }}
          onClick={() => handleEditClick(user)}
        >
          <IconEdit color={"white"} size={22} />
        </IconButton>
        <IconButton
          onClick={() => {
            router.push(`/users/${user.id}`);
          }}
          sx={{ bgcolor: "blue", borderRadius: "10px" }}
        >
          <IconEye color="white" />
        </IconButton>
      </Box>
    ),
  };

  const headersColumns = [
    {
      text: "User Name",
      value: (user: User) => user.username,
      id: "user_name_id",
    },
    {
      text: "Name",
      value: (user: User) => user.name,
      id: "name",
    },
    {
      text: "Email",
      value: (user: User) => user.email,
      id: "emial",
    },

    {
      text: "Phone Number",
      value: (user: User) => user.phone,
      id: "phone_number",
    },
  ];

  return (
    <>
      <TableContent
        identityKey="id"
        headers={headersColumns}
        caption="Tidak ada data user yang dapat ditampilkan"
        icon={emptyTicket}
        actionOptions={renderOptions}
        data={users}
        showNoDataImage={false}
      />
      {renderEditModal}
    </>
  );
};

export default UserListContent;
