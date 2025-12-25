import { useShipmentStore } from "../../stores/shipment.store";
import { Button, Paper, Stack } from "@mui/material";
import ShipmentsTable from "./components/ShipmentsTable";
import CreateShipmentDialog from "./components/CreateShipmentDialog";
import { useState, useEffect } from "react";

export default function ShipmentsPage() {
  const { shipments, fetchShipments, createShipment } = useShipmentStore();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    fetchShipments();
  }, []);

  return (
    <Paper
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack sx={{ gap: 4 }}>
        <Button variant="contained" onClick={() => setCreateDialogOpen(true)}>
          Create Shipment
        </Button>
        <ShipmentsTable shipments={shipments} />
      </Stack>

      <CreateShipmentDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreate={createShipment}
      />
    </Paper>
  );
}
