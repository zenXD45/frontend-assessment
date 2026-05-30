'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Box, TextField, Typography, CircularProgress, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Avatar, InputAdornment } from '@mui/material';
import { useUsersStore } from '@/store/useUsersStore';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const LIMIT = 10;

// Helper to get initials
const getInitials = (firstName: string, lastName: string) => {
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
};

// Helper for avatar colors based on initials length or random consistent
const getAvatarColor = (firstName: string) => {
  const colors = ['primary.main', 'secondary.main', 'primary.light', 'secondary.light'];
  return colors[firstName.length % colors.length];
};

const getAvatarTextColor = (firstName: string) => {
  const isLight = ['primary.light', 'secondary.light'].includes(getAvatarColor(firstName));
  return isLight ? 'primary.dark' : 'primary.contrastText';
};

export default function UsersPage() {
  const { users, total, loading, error, fetchUsers } = useUsersStore();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  // Debounce state to avoid fetching on every keystroke
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // reset to first page on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const skip = (page - 1) * LIMIT;
    fetchUsers(skip, LIMIT, debouncedSearch);
  }, [page, debouncedSearch, fetchUsers]);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" color="text.primary">
            Users Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage student applications and administrative staff.
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: { xs: '100%', md: 'auto' } }}>
          <TextField
            placeholder="Search users by name, email..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: { xs: '100%', md: 320 }, bgcolor: 'background.paper' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
            sx={{ display: { xs: 'none', md: 'flex' }, whiteSpace: 'nowrap' }}
          >
            Add User
          </Button>
        </Box>
      </Box>

      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      
      {/* Table Section */}
      <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
        <TableContainer sx={{ flexGrow: 1 }}>
          <Table stickyHeader aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Company</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">No users found.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow hover key={user.id} sx={{ cursor: 'default' }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            bgcolor: getAvatarColor(user.firstName),
                            color: getAvatarTextColor(user.firstName),
                            fontSize: '0.875rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {getInitials(user.firstName, user.lastName)}
                        </Avatar>
                        <Typography variant="body2" fontWeight="500" color="text.primary">
                          {user.firstName} {user.lastName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.gender}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.company?.name || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => router.push(`/users/${user.id}`)}
                        sx={{ minWidth: 'auto', py: 0.5, px: 2, borderColor: 'divider', color: 'primary.main', '&:hover': { bgcolor: 'action.hover' } }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Custom Pagination */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Typography variant="body2" color="text.secondary">
            Showing {users.length > 0 ? (page - 1) * LIMIT + 1 : 0}-{Math.min(page * LIMIT, total)} of {total} users
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              sx={{ minWidth: 36, width: 36, p: 0, borderColor: 'divider' }}
            >
              <ChevronLeftIcon />
            </Button>
            
            <Typography variant="body2" sx={{ mx: 1 }}>
              Page {page} of {totalPages || 1}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              sx={{ minWidth: 36, width: 36, p: 0, borderColor: 'divider' }}
            >
              <ChevronRightIcon />
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
