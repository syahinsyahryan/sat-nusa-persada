import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../components/Title/Title";
import { useGetUsers } from "@/hooks/useGetUser";
import CircularProgress from "@mui/material/CircularProgress";
import { User } from "@/utils/interface";
import { TableContentHeader } from "@/components/base/table";
import { Stack, Typography, Box } from "@mui/material";
import UserListHeader from "@/components/table/user-list/header";
import UserListContent from "@/components/table/user-list/content";

export default function Orders() {
  const { users, loading, error } = useGetUsers();
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
      <UserListContent />
    </>
  );
}
