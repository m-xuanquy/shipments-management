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
import { updateUserSchema } from "../../../schema";
import type { UpdateUserFormData } from "../../../schema";
import type { User } from "../../../types/user.interface";

interface EditUserDialogProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onUpdate: (data: UpdateUserFormData) => Promise<void>;
}

export default function EditUserDialog({
  open,
  user,
  onClose,
  onUpdate,
}: EditUserDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    values: user
      ? {
          fullname: user.fullname,
          email: user.email,
          phone: user.phone,
        }
      : undefined,
  });

  const onSubmit = async (data: UpdateUserFormData) => {
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
      <DialogTitle>Edit User</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          dir="rtl" sx={{ display: "flex", gap: 4, flexDirection: "column" }}
        >
          <TextField
            fullWidth
            label="Full name"
            {...register("fullname")}
            error={!!errors.fullname}
            helperText={errors.fullname?.message}
          />

          <TextField
            fullWidth
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label="Phone"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update User"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
