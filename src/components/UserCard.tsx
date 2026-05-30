import React, { memo } from 'react';
import { Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import { User } from '@/store/useUsersStore';
import Link from 'next/link';

interface UserCardProps {
  user: User;
}

// React.memo prevents this component from re-rendering unless its props change.
const UserCard: React.FC<UserCardProps> = memo(({ user }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Email: {user.email}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Gender: {user.gender}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Phone: {user.phone}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Company: {user.company?.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} href={`/users/${user.id}`}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
});

UserCard.displayName = 'UserCard';

export default UserCard;
