import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import type { Shipment } from "../../../types/shipment.interface";

interface DeleteShipmentDialogProps {
  open: boolean;
  shipment: Shipment | null;
  onClose: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

export default function DeleteShipmentDialog({
  open,
  shipment,
  onClose,
  onDelete,
  isDeleting = false,
}: DeleteShipmentDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Delete Shipment</DialogTitle>
      <DialogContent>
        <Typography>Confirm deletion of shipment {shipment?.id}?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            onDelete();
            onClose();
          }}
          color="error"
          variant="contained"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
