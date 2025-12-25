import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  People as PeopleIcon,
  LocalShipping as LocalShippingIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useAuthStore } from '../stores/auth.store';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
      <AppBar position="static">
        <Toolbar>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              startIcon={<LocalShippingIcon />}
              onClick={() => navigate('/')}
              sx={{
                backgroundColor: isActive('/') ? 'rgba(255,255,255,0.1)' : 'transparent',
              }}
            >
              Shipments
            </Button>
            <Button
              color="inherit"
              startIcon={<PeopleIcon />}
              onClick={() => navigate('/users')}
              sx={{
                backgroundColor: isActive('/users') ? 'rgba(255,255,255,0.1)' : 'transparent',
              }}
            >
              Users
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              {user?.fullname}
            </Typography>
            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        {children}
      </Container>

    
    </Box>
  );
}
