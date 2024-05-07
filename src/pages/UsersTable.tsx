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
    <React.Fragment>
      <Title>Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((each: User) => (
            <TableRow key={each.id}>
              <TableCell>{each.username}</TableCell>
              <TableCell>{each.name}</TableCell>
              <TableCell>{each.email}</TableCell>
              <TableCell>{`${each.address.street}, ${each.address.suite}, ${each.address.city}, ${each.address.zipcode}`}</TableCell>
              <TableCell>{each.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
