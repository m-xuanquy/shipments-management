import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { updateShipmentSchema } from "../../../schema";
import type { UpdateShipmentFormData } from "../../../schema";
import type { Shipment } from "../../../types/shipment.interface";

interface EditShipmentDialogProps {
  open: boolean;
  shipment: Shipment | null;
  onClose: () => void;
  onUpdate: (data: UpdateShipmentFormData) => Promise<void>;
}

export default function EditShipmentDialog({
  open,
  shipment,
  onClose,
  onUpdate,
}: EditShipmentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateShipmentFormData>({
    resolver: zodResolver(updateShipmentSchema),
    values: shipment
      ? {
          pickupLocation: shipment.pickupLocation,
          deliveryLocation: shipment.deliveryLocation,
          deliveryPerson: shipment.deliveryPerson,
        }
      : undefined,
  });

  const onSubmit = async (data: UpdateShipmentFormData) => {
    setIsSubmitting(true);
    try {
      await onUpdate(data);
      reset();
      onClose();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Shipment</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{ display: "flex", gap: 4, flexDirection: "column" }}
        >
          <TextField
            fullWidth
            label="Pickup location"
            {...register("pickupLocation")}
            error={!!errors.pickupLocation}
            helperText={errors.pickupLocation?.message}
          />

          <TextField
            fullWidth
            label="Delivery location"
            {...register("deliveryLocation")}
            error={!!errors.deliveryLocation}
            helperText={errors.deliveryLocation?.message}
          />

          <TextField
            fullWidth
            label="Delivery person"
            {...register("deliveryPerson")}
            error={!!errors.deliveryPerson}
            helperText={errors.deliveryPerson?.message}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Shipment"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
