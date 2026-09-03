import { useState } from 'react';
import { Button, Card, CardContent, Chip, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import { AddressFormDialog } from './AddressFormDialog.jsx';
import { ConfirmDialog } from '../common/ConfirmDialog.jsx';

const TYPE_ICON = {
  HOME: HomeIcon,
  WORK: WorkIcon,
  OTHER: PlaceIcon,
};

export function AddressList({ addresses, onCreate, onUpdate, onDelete }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const openCreateDialog = () => {
    setEditingAddress(null);
    setDialogOpen(true);
  };

  const openEditDialog = (address) => {
    setEditingAddress(address);
    setDialogOpen(true);
  };

  const handleSubmit = async (formValues) => {
    if (editingAddress) {
      await onUpdate(editingAddress.id, formValues);
    } else {
      await onCreate(formValues);
    }
  };

  const handleConfirmDelete = async () => {
    await onDelete(pendingDeleteId);
    setPendingDeleteId(null);
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Addresses</Typography>
        <Button startIcon={<AddIcon />} variant="contained" size="small" onClick={openCreateDialog}>
          Add address
        </Button>
      </Stack>

      {addresses.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">This user has no addresses yet.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {addresses.map((address) => {
            const Icon = TYPE_ICON[address.type] ?? PlaceIcon;
            return (
              <Grid item xs={12} sm={6} key={address.id}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Chip
                        icon={<Icon fontSize="small" />}
                        label={address.type.charAt(0) + address.type.slice(1).toLowerCase()}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Stack direction="row" spacing={0.5}>
                        <IconButton size="small" onClick={() => openEditDialog(address)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => setPendingDeleteId(address.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Stack>

                    <Typography variant="body2" sx={{ mt: 1.5 }}>
                      {address.line1}
                    </Typography>
                    {address.line2 && <Typography variant="body2">{address.line2}</Typography>}
                    <Typography variant="body2">
                      {address.city}, {address.state} {address.postalCode}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {address.country}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <AddressFormDialog
        open={dialogOpen}
        initialValue={editingAddress}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete address"
        description="This will permanently remove the address from this user's profile."
        confirmLabel="Delete"
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={handleConfirmDelete}
      />
    </Stack>
  );
}
