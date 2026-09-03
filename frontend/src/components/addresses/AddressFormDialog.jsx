import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { validateAddress } from '../../utils/validators.js';

const ADDRESS_TYPES = ['HOME', 'WORK', 'OTHER'];

const emptyForm = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  type: 'HOME',
};

/**
 * Single dialog used for both "add" and "edit" flows - `initialValue` is
 * null when creating a new address and populated when editing one.
 */
export function AddressFormDialog({ open, initialValue, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(initialValue ?? emptyForm);
      setErrors({});
    }
  }, [open, initialValue]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateAddress(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit(form);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialValue ? 'Edit address' : 'Add address'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12}>
            <TextField
              label="Address line 1"
              fullWidth
              value={form.line1}
              onChange={handleChange('line1')}
              error={!!errors.line1}
              helperText={errors.line1}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address line 2 (optional)"
              fullWidth
              value={form.line2 ?? ''}
              onChange={handleChange('line2')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              fullWidth
              value={form.city}
              onChange={handleChange('city')}
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="State / Region"
              fullWidth
              value={form.state}
              onChange={handleChange('state')}
              error={!!errors.state}
              helperText={errors.state}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Postal code"
              fullWidth
              value={form.postalCode}
              onChange={handleChange('postalCode')}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              fullWidth
              value={form.country}
              onChange={handleChange('country')}
              error={!!errors.country}
              helperText={errors.country}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Type"
              fullWidth
              value={form.type}
              onChange={handleChange('type')}
            >
              {ADDRESS_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0) + type.slice(1).toLowerCase()}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={submitting}>
          {initialValue ? 'Save changes' : 'Add address'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
