import React, { FC, useState } from "react";
import { TableContentHeader } from "../../base/table";
import {
  Stack,
  Typography,
  Box,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { IconCirclePlus } from "@tabler/icons-react";
import { useInsertUsers } from "@/hooks/useInsertUser";
import { insertUser } from "@/api";

const UserListHeader: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateNumericId = () => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleSubmit = () => {
    const user = {
      id: generateNumericId(),
      ...formData,
    };

    console.log("User data:", user);
    insertUser(user);
    handleCloseModal();
  };

  return (
    <>
      <TableContentHeader
        action={
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "40px",
              width: "100%",
              justifyContent: "space-between",
              mb: "10px",
            }}
          >
            <Box alignItems="center" sx={{ mb: "10px" }}>
              <Typography variant="h6">User Management Data</Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{ padding: "8px 20px", gap: "2px" }}
                onClick={handleOpenModal}
              >
                <IconCirclePlus />
                Add User
              </Button>
            </Box>
          </Box>
        }
      />
      <Modal open={openModal} onClose={handleCloseModal}>
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
            Add New User
          </Typography>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="username"
            label="UserName"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            name="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleSubmit}>
            Send
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default UserListHeader;
