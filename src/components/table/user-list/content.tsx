import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { TableContent } from "@/components/base/table";
import { useGetUsers } from "@/hooks/useGetUser";
const emptyTicket = "/assets/images/ticket-client/empty_ticket.png";

const TicketListContent: React.FC = () => {
  const router = useRouter();
  const { users, loading, error } = useGetUsers();


  const renderOptions = {
    text: "Aksi",
    show: true,
    render: (rowData: any) => (
      <Box sx={{ display: "flex", flexDirection: "row", gap: "4px" }}>
        <Button
          variant="outlined"
          onClick={() => {
            router.push(`/admin/ticketing/${rowData?.uuid}`);
          }}
          sx={{ width: "80px", height: "30px", borderRadius: "5px" }}
        >
          Detail
        </Button>
      </Box>
    ),
  };

  const headersColumns = [
    {
      text: "Tiket ID",
      value: (data: any) => data?.id,
      id: "tiket_id",
    },
    {
      text: "Kendala",
      value: (data: any) => data?.m_kategori_tiket?.nama,
      id: "Kendala",
    },
    {
      text: "No. Resi",
      value: (data: any) => data?.order?.nomor_resi ?? "-",
      id: "referensi",
    },
    {
      text: "Pembeli",
      value: (data: any) => data?.order?.m_pelanggan?.name ?? "-",
      id: "referensi",
    },
    {
      text: "Status Tracking",
      value: (data: any) => data?.order?.m_status_order?.name,
      id: "nominal",
    },
  ];

  return (
    <TableContent
      identityKey="id"
      headers={headersColumns}
      caption="Tidak ada data tiket yang dapat ditampilkan"
      icon={emptyTicket}
      actionOptions={renderOptions} data={[]} showNoDataImage={false}    />
  );
};

export default TicketListContent;
