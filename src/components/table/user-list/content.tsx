import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { TableContent } from "components/base/table";
import { formatDateTime } from "utils/date-format";
import { useTicketAdminTableData } from "hooks/queries/admin/ticket-admin/useTicketAdminTableData";
import { handleColorStatusTiket } from "components/table/ticket-client/content";

const emptyTicket = "/assets/images/ticket-client/empty_ticket.png";

const TicketListContent: React.FC = () => {
  const router = useRouter();
  const { data, isLoading } = useTicketAdminTableData();

  const isShowNoDataImage = useMemo(() => data?.data?.length < 1, [data]);

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
      text: "Tanggal Dibuat",
      value: (data: any) => formatDateTime(data?.created_at),
      id: "createdAt",
    },
    {
      text: "Terakhir Update",
      value: (data: any) => formatDateTime(data?.updated_at),
      id: "updatedAt",
    },
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
      text: "Status",
      value: (data: any) => (
        <Box
          sx={{
            borderRadius: "16px",
            backgroundColor: handleColorStatusTiket(data?.m_status_tiket?.nama)
              ?.bg,
            padding: "4px 10px",
            border: handleColorStatusTiket(data?.m_status_tiket?.nama)?.br,
            textAlign: "center",
          }}
        >
          <Typography
            fontWeight={500}
            sx={{
              color: handleColorStatusTiket(data?.m_status_tiket?.nama)?.text,
            }}
          >
            {data?.m_status_tiket?.nama}
          </Typography>
        </Box>
      ),
      id: "status",
    },
    {
      text: "Ekspedisi",
      value: (data: any) => (
        <Box sx={{ display: "flex", width: "60px" }}>
          {data?.order?.m_ekspedisi ? (
            <img
              src={data?.order?.m_ekspedisi?.logo}
              alt={data?.order?.m_ekspedisi?.name}
              style={{ objectFit: "contain", width: "100%" }}
            />
          ) : (
            "-"
          )}
        </Box>
      ),
      id: "referensi",
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
      data={isLoading ? [] : data?.data}
      headers={headersColumns}
      showNoDataImage={isShowNoDataImage}
      caption="Tidak ada data tiket yang dapat ditampilkan"
      icon={emptyTicket}
      actionOptions={renderOptions}
    />
  );
};

export default TicketListContent;
