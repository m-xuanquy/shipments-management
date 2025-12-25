import { useShipmentStore } from "../../stores/shipment.store";
import { Button, Stack } from "@mui/material";
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
    <>
      <Stack sx={{ gap: 4 }}>
        <Button variant="contained" sx={{ alignSelf: "flex-end" }} onClick={() => setCreateDialogOpen(true)}>
          Create Shipment
        </Button>
        <ShipmentsTable shipments={shipments} />
      </Stack>

      <CreateShipmentDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreate={createShipment}
      />
    </>
  );
}
