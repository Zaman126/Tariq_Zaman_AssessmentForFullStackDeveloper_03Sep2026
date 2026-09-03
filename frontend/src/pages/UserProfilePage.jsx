import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useUserDetail } from '../hooks/useUserDetail.js';
import { UserProfileForm } from '../components/users/UserProfileForm.jsx';
import { AddressList } from '../components/addresses/AddressList.jsx';
import { LoadingState } from '../components/common/LoadingState.jsx';
import { ErrorState } from '../components/common/ErrorState.jsx';

export function UserProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, loading, error, refresh, saveProfile, createAddress, editAddress, removeAddress } =
    useUserDetail(userId);

  if (loading) return <LoadingState label="Loading user…" />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;
  if (!user) return null;

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
        Back to users
      </Button>

      <Typography variant="h5" sx={{ mb: 3 }}>
        {user.firstName} {user.lastName}
      </Typography>

      <Stack spacing={4}>
        <UserProfileForm user={user} onSave={saveProfile} />
        <AddressList
          addresses={user.addresses}
          onCreate={createAddress}
          onUpdate={editAddress}
          onDelete={removeAddress}
        />
      </Stack>
    </Box>
  );
}
