import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { Typography, Button, IconButton, Box } from "@mui/material";
import { IconEdit, IconEye } from "@tabler/icons-react";

import { TableContent } from "@/components/base/table";
import { useGetUsers } from "@/hooks/useGetUser";
import { User } from "@/utils/interface";
const emptyTicket = "/assets/images/ticket-client/empty_ticket.png";

const UserListContent: React.FC = () => {
  const router = useRouter();
  const { users: data, loading, error } = useGetUsers();

  const renderOptions = {
    text: "Actions",
    show: true,
    render: (data) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          justifyContent: "center",
        }}
      >
        <IconButton sx={{ bgcolor: "orange", borderRadius: "6px" }}>
          <IconEdit color={"white"} size={22} />
        </IconButton>

        <IconButton
          onClick={() => {
            router.push(`/users/${data?.id}`);
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
      value: (data: any) => data?.username,
      id: "user_name_id",
    },
    {
      text: "Name",
      value: (data: any) => data?.name,
      id: "name",
    },
    {
      text: "Email",
      value: (data: any) => data?.email,
      id: "emial",
    },
    {
      text: "Address",
      value: (data: any) =>
        `${data.address.street},${data.address.suite},${data.address.city}`,
      id: "address",
    },
    {
      text: "Phone Number",
      value: (data: any) => data?.phone,
      id: "phone_number",
    },
  ];

  return (
    <TableContent
      identityKey="id"
      headers={headersColumns}
      caption="Tidak ada data user yang dapat ditampilkan"
      icon={emptyTicket}
      actionOptions={renderOptions}
      data={loading ? [] : data}
      showNoDataImage={false}
    />
  );
};

export default UserListContent;
