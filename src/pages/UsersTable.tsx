import * as React from "react";
import { useState } from "react";
import Link from "@mui/material/Link";
import Title from "../components/Title/Title";
import { useGetUsers } from "@/hooks/useGetUser";
import CircularProgress from "@mui/material/CircularProgress";
import { User } from "@/utils/interface";
import { TableContentHeader } from "@/components/base/table";
import {
  Stack,
  Typography,
  Box,
  Checkbox,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import UserListHeader from "@/components/table/user-list/header";
import UserListContent from "@/components/table/user-list/content";
import UserListFooter from "@/components/table/user-list/footer";

export default function Orders() {
  const pageSizeSet = [2, 5, 10];
  const [pageSize, setPageSize] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const { users, loading, error } = useGetUsers(currentPage, pageSize);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (!users || error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        No data available
      </div>
    );
  }
  return (
    <>
      <UserListHeader />
      <UserListContent users={users} />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              background: "#F9F9F9",
              borderRadius: "4px",
              padding: "4px 8px",
            }}
          >
            {pageSizeSet?.map((el) => (
              <Typography
                key={el}
                sx={{
                  background: el === pageSize ? "#1976d2" : "none",
                  padding: "4px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  minWidth: "26px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                color={el === pageSize ? "white" : "grey"}
                onClick={() => {
                  setPageSize(el);
                }}
              >
                {el}
              </Typography>
            ))}
            <Typography fontWeight={600}>
              Menampilkan {pageSize} Data
            </Typography>
          </Box>
          <Pagination
            count={Math.ceil(10 / pageSize)}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
}
