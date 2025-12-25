import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schema";
import type { RegisterFormData } from "../../schema";
import { useAuthStore } from "../../stores/auth.store";
import { TextField, Button, Typography, Box, Alert, Stack, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { register: authRegister, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    await authRegister(data);
  };

  return <Paper sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography component="h1" variant="h5">
            Register
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}

        <Stack dir="rtl" component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3, width: '100%', gap: 2 }}>
            <TextField 
                label="Fullname"
                {...register("fullname")}
                error={!!errors.fullname}
                helperText={errors.fullname?.message}
            />
            
            <TextField
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                />
            <TextField
                label="Phone"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
            /> 
                <TextField
                label="Password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                type="password"
                />
                <TextField 
                    label="Confirm Password"
                    {...register("confirmPassword")}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    type="password"
                />

                <Button type="submit" disabled={isSubmitting} variant="contained">
                {isSubmitting ? 'Registering...' : 'Register'}
                </Button>

                <Link to="/login">
                    <Typography variant="body2" sx={{ margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                To Login</Typography>
                </Link>
            </Stack>    
    </Box>
  </Paper>;
}
