'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography, Paper, Alert, Checkbox, FormControlLabel, Link as MuiLink } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid username or password.');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        padding: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '480px' }}>
        <Paper
          elevation={1}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Image
              src="/logo.svg"
              alt="Help Study Abroad Logo"
              width={120}
              height={120}
              style={{ objectFit: 'contain', marginBottom: '16px' }}
            />
            <Typography variant="h4" component="h1" color="text.primary">
              Admin Portal
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Sign in to manage applications
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ width: '100%', mb: 3 }}>{error}</Alert>}

          <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              InputLabelProps={{ shrink: true }}
              placeholder=" "
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              InputLabelProps={{ shrink: true }}
              placeholder=" "
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.5 }}>
              <FormControlLabel
                control={<Checkbox color="primary" size="small" />}
                label={<Typography variant="body2" color="text.secondary">Remember me</Typography>}
              />
              <MuiLink href="#" underline="hover" color="primary" variant="subtitle2">
                Forgot password?
              </MuiLink>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={loading}
              endIcon={!loading && <LoginIcon />}
              sx={{ mt: 1, py: 1.5 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <MuiLink
              href="#"
              underline="none"
              color="text.secondary"
              variant="body2"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, '&:hover': { color: 'text.primary' } }}
            >
              <HelpOutlineIcon fontSize="small" />
              Need technical support?
            </MuiLink>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
