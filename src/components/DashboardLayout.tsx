'use client';
import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Typography, Avatar, IconButton } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const drawerWidth = 280;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { label: 'Users', path: '/users', icon: <PeopleIcon /> },
    { label: 'Products', path: '/products', icon: <InventoryIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      
      <Drawer
        variant="permanent"
        sx={{
          width: { xs: 0, md: drawerWidth },
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column'
          },
        }}
      >
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
            <AdminPanelSettingsIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" color="primary.main" sx={{ lineHeight: 1.2 }}>
              Admin Portal
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Management Console
            </Typography>
          </Box>
        </Box>

        <Box sx={{ overflow: 'auto', flexGrow: 1, mt: 2 }}>
          <List sx={{ px: 0 }}>
            {navItems.map((item) => {
              const active = pathname.startsWith(item.path);
              return (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton 
                    selected={active}
                    onClick={() => router.push(item.path)}
                    sx={{
                      py: 1.5,
                      px: 3,
                      borderLeft: active ? '4px solid' : '4px solid transparent',
                      borderColor: active ? 'primary.main' : 'transparent',
                      bgcolor: active ? 'primary.light' : 'transparent',
                      '&:hover': {
                        bgcolor: active ? 'primary.light' : 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: active ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label} 
                      primaryTypographyProps={{ 
                        variant: 'body2', 
                        fontWeight: active ? 700 : 500,
                        color: active ? 'primary.main' : 'text.secondary'
                      }} 
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box sx={{ p: 2 }}>
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton sx={{ py: 1.5, px: 3, borderRadius: 1 }}>
                <ListItemIcon sx={{ color: 'text.secondary', minWidth: 40 }}><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Settings" primaryTypographyProps={{ variant: 'body2', color: 'text.secondary', fontWeight: 500 }} />
              </ListItemButton>
            </ListItem>
            {session && (
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout} sx={{ py: 1.5, px: 3, borderRadius: 1 }}>
                  <ListItemIcon sx={{ color: 'text.secondary', minWidth: 40 }}><LogoutIcon /></ListItemIcon>
                  <ListItemText primary="Logout" primaryTypographyProps={{ variant: 'body2', color: 'text.secondary', fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
    </Box>
  );
}
