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
import { changePasswordSchema } from "../../../schema";
import type { ChangePasswordFormData } from "../../../schema";

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onChangePassword: (data: ChangePasswordFormData) => Promise<void>;
}

export default function ChangePasswordDialog({
  open,
  onClose,
  onChangePassword,
}: ChangePasswordDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setIsSubmitting(true);
    try {
      await onChangePassword(data);
      reset();
      onClose();
    } catch {
      // Error handling is done in the service/store
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
      <DialogTitle>Change Password</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          dir="rtl" sx={{ display: "flex", gap: 4, flexDirection: "column" }}
        >
          <TextField
            fullWidth
            type="password"
            label="Current Password"
            {...register("currentPassword")}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
          />

          <TextField
            fullWidth
            type="password"
            label="New Password"
            {...register("newPassword")}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm New Password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Changing..." : "Change Password"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
