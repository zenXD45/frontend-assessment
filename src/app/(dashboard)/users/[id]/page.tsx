'use client';
import React, { useEffect } from 'react';
import { Box, Typography, Button, Paper, CircularProgress, Grid, Avatar, Divider, Chip } from '@mui/material';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useUsersStore } from '@/store/useUsersStore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import BusinessIcon from '@mui/icons-material/Business';

export default function SingleUserPage() {
  const { id } = useParams();
  const { selectedUser, loading, error, fetchUserById } = useUsersStore();

  useEffect(() => {
    if (id) {
      fetchUserById(id as string);
    }
  }, [id, fetchUserById]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{error}</Typography>
        <Button startIcon={<ArrowBackIcon />} component={Link} href="/users" sx={{ mt: 2 }}>
          Back to Users
        </Button>
      </Box>
    );
  }

  if (!selectedUser) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      <Box sx={{ mb: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          component={Link} 
          href="/users" 
          color="inherit"
          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}
        >
          Back to Users
        </Button>
      </Box>
      
      <Grid container spacing={3} alignItems="flex-start">
        {/* Left Column: Identity Card */}
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 0, overflow: 'hidden', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '8px', bgcolor: 'primary.main' }} />
            
            <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Avatar 
                src={selectedUser.image}
                alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                sx={{ width: 120, height: 120, mb: 2, border: '4px solid', borderColor: 'background.paper', boxShadow: 1 }}
              />
              
              <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
                {selectedUser.firstName} {selectedUser.lastName}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Chip 
                  label="Active User" 
                  size="small" 
                  color="primary" 
                  variant="outlined" 
                  sx={{ bgcolor: 'primary.light', color: 'primary.dark', borderColor: 'primary.main', fontWeight: 500 }} 
                />
                <Typography variant="caption" color="text.secondary">
                  ID: HSA-{selectedUser.id.toString().padStart(4, '0')}
                </Typography>
              </Box>

              <Divider sx={{ width: '100%', my: 2 }} />

              <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<EmailIcon />} 
                  fullWidth
                  href={`mailto:${selectedUser.email}`}
                >
                  Email
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  startIcon={<EditIcon />} 
                  fullWidth
                >
                  Edit
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column: Details */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            {/* Personal Details */}
            <Paper elevation={1} sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <ContactPageIcon color="primary" />
                <Typography variant="h6" component="h2" fontWeight="bold">
                  Personal Details
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1 }}>Email Address</Typography>
                    <Typography variant="body1">{selectedUser.email}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1 }}>Phone Number</Typography>
                    <Typography variant="body1">{selectedUser.phone}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1 }}>Gender</Typography>
                    <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{selectedUser.gender}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1 }}>Date of Birth</Typography>
                    <Typography variant="body1">{selectedUser.birthDate || 'N/A'}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1 }}>Blood Group</Typography>
                    <Typography variant="body1">{selectedUser.bloodGroup || 'N/A'}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1 }}>Height / Weight</Typography>
                    <Typography variant="body1">{selectedUser.height}cm / {selectedUser.weight}kg</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Professional Background */}
            <Paper elevation={1} sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <BusinessIcon color="primary" />
                <Typography variant="h6" component="h2" fontWeight="bold">
                  Professional Background
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1 }}>Company</Typography>
                    <Typography variant="body1">{selectedUser.company?.name || 'N/A'}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1 }}>Department</Typography>
                    <Typography variant="body1">{selectedUser.company?.department || 'N/A'}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1 }}>Role / Title</Typography>
                    <Typography variant="body1">{selectedUser.company?.title || 'N/A'}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1 }}>University</Typography>
                    <Typography variant="body1">{selectedUser.university || 'N/A'}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
