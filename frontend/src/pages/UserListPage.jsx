import { Box, Paper, Typography } from '@mui/material';
import { useUsers } from '../hooks/useUsers.js';
import { UserTable } from '../components/users/UserTable.jsx';
import { LoadingState } from '../components/common/LoadingState.jsx';
import { ErrorState } from '../components/common/ErrorState.jsx';

export function UserListPage() {
  const { users, loading, error, refresh } = useUsers();

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5">Users</Typography>
        <Typography variant="body2" color="text.secondary">
          Select a user to view or update their profile and addresses.
        </Typography>
      </Box>

      {loading && <LoadingState label="Loading users…" />}
      {!loading && error && <ErrorState message={error} onRetry={refresh} />}

      {!loading && !error && (
        users.length === 0 ? (
          <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">No users found.</Typography>
          </Paper>
        ) : (
          <UserTable users={users} />
        )
      )}
    </Box>
  );
}
