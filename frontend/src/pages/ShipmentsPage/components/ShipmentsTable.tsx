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
  TablePagination,
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedShipments = shipments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
      <TableContainer sx={{ overflowX: "auto" ,  width: '100%'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "right" }}>ID</TableCell>
              <TableCell sx={{ textAlign: "right" }}>Pickup Location</TableCell>
              <TableCell sx={{ textAlign: "right" }}>Delivery Location</TableCell>
              <TableCell sx={{ textAlign: "right" }}>Delivery Person</TableCell>
              <TableCell sx={{ textAlign: "right" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedShipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell sx={{ textAlign: "right" }}>{shipment.id}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>{shipment.pickupLocation}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>{shipment.deliveryLocation}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>{shipment.deliveryPerson}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={shipments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

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
