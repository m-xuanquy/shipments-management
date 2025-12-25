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
import { createShipmentSchema } from "../../../schema";
import type { CreateShipmentFormData } from "../../../schema";

interface CreateShipmentDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreateShipmentFormData) => Promise<void>;
}

export default function CreateShipmentDialog({
  open,
  onClose,
  onCreate,
}: CreateShipmentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateShipmentFormData>({
    resolver: zodResolver(createShipmentSchema),
  });

  const onSubmit = async (data: CreateShipmentFormData) => {
    setIsSubmitting(true);
    try {
      await onCreate(data);
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
      <DialogTitle>Create New Shipment</DialogTitle>
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
            {isSubmitting ? "Creating..." : "Create Shipment"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
