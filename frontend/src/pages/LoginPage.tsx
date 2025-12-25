import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema";
import type { LoginFormData } from "../schema";
import { useAuthStore } from "../stores/auth.store";
import { TextField, Button, Typography, Box, Alert, Stack, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { login, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return <Paper sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography component="h1" variant="h5">
            Login
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}

        <Stack component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3, width: '100%', gap: 2 }}>
            <TextField
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                />

                <TextField
                label="Password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                type="password"
                />

                <Button type="submit" disabled={isSubmitting} variant="contained">
                {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>

                <Link to="/register">
                    <Typography variant="body2" sx={{ margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                To Register</Typography>
                </Link>
            </Stack>    
    </Box>
  </Paper>;
}
