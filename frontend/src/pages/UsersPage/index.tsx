import { useUserStore } from "../../stores/user.store";
import { Stack } from "@mui/material";
import UsersTable from "./components/UsersTable";

import { useEffect } from "react";

export default function UsersPage() {
  const { users, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Stack sx={{ gap: 4 }}>

        <UsersTable users={users} />
      </Stack>

    </>
  );
}
