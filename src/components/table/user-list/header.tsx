import { FC } from "react";
import { TableContentHeader } from "../../base/table";
import { Stack, Typography } from "@mui/material";

const TicketListHeader: FC = () => {
  return (
    <TableContentHeader
      action={
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h6">User Management Data</Typography>
        </Stack>
      }
    />
  );
};

export default TicketListHeader;
