import type { Shipment } from "../../../types/shipment.interface";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditShipmentDialog from "./EditShipmentDialog";
import DeleteShipmentDialog from "./DeleteShipmentDialog";
import { useState } from "react";
import { useShipmentStore } from "../../../stores/shipment.store";

export default function ShipmentsTable({
  shipments,
}: {
  shipments: Shipment[];
}) {
  const { updateShipment, deleteShipment } = useShipmentStore();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return shipments.length === 0 ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        No shipments available.
      </Typography>
    </Box>
  ) : (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Pickup Location</TableCell>
              <TableCell>Delivery Location</TableCell>
              <TableCell>Delivery Person</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.id}</TableCell>
                <TableCell>{shipment.pickupLocation}</TableCell>
                <TableCell>{shipment.deliveryLocation}</TableCell>
                <TableCell>{shipment.deliveryPerson}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setSelectedShipment(shipment);
                      setUpdateDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => {
                      setSelectedShipment(shipment);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditShipmentDialog
        open={updateDialogOpen}
        onClose={() => setUpdateDialogOpen(false)}
        onUpdate={(data) => updateShipment(selectedShipment!.id, data)}
        shipment={selectedShipment!}
      />

      <DeleteShipmentDialog
        open={deleteDialogOpen}
        shipment={selectedShipment}
        onClose={() => setDeleteDialogOpen(false)}
        onDelete={() => deleteShipment(selectedShipment!.id)}
      />
    </>
  );
}
