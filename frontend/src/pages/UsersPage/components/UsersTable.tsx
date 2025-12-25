import type { User } from "../../../types/user.interface";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
} from "@mui/material";
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { useState } from "react";
import { useUserStore } from "../../../stores/user.store";
import { useAuthStore } from "../../../stores/auth.store";
export default function UsersTable({ users }: { users: User[] }) {
  const { updateUser, deleteUser, changePassword } = useUserStore();
  const currentUser = useAuthStore((state) => state.user);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return users.length === 0 ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        No users available.
      </Typography>
    </Box>
  ) : (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "right" }}>ID</TableCell>
              <TableCell sx={{ textAlign: "right" }}>Full Name</TableCell>
              <TableCell sx={{ textAlign: "right" }}>Email</TableCell>
              <TableCell sx={{ textAlign: "right" }}>Phone</TableCell>
              <TableCell  sx={{ textAlign: "right" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ textAlign: "right" }}>{user.id}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>{user.fullname}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>{user.email}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>{user.phone}</TableCell>
                <TableCell  sx={{ textAlign: "right" }}>
                  <Button
                    onClick={() => {
                      setSelectedUser(user);
                      setUpdateDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  {user.id === currentUser?.id ? (
                    <Button
                      color="primary"
                      onClick={() => {
                        setChangePasswordDialogOpen(true);
                      }}
                    >
                      Change Password
                    </Button>
                  ) : (
                    <Button
                      color="error"
                      onClick={() => {
                        setSelectedUser(user);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <EditUserDialog
        open={updateDialogOpen}
        user={selectedUser}
        onClose={() => setUpdateDialogOpen(false)}
        onUpdate={(data) => updateUser(selectedUser!.id, data)}
      />

      <DeleteUserDialog
        open={deleteDialogOpen}
        user={selectedUser}
        onClose={() => setDeleteDialogOpen(false)}
        onDelete={() => deleteUser(selectedUser!.id)}
      />

      <ChangePasswordDialog
        open={changePasswordDialogOpen}
        onClose={() => setChangePasswordDialogOpen(false)}
        onChangePassword={(data) => changePassword(data.currentPassword, data.newPassword)}
      />
    </>
  );
}
