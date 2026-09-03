import { useEffect, useState } from 'react';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { validateProfile } from '../../utils/validators.js';

export function UserProfileForm({ user, onSave }) {
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ email: user.email, firstName: user.firstName, lastName: user.lastName });
    }
  }, [user]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setSavedMessage(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateProfile(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    try {
      await onSave(form);
      setSavedMessage(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Profile
      </Typography>
      <Stack component="form" spacing={2} onSubmit={handleSubmit} noValidate>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="First name"
            fullWidth
            value={form.firstName}
            onChange={handleChange('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Last name"
            fullWidth
            value={form.lastName}
            onChange={handleChange('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Stack>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={form.email}
          onChange={handleChange('email')}
          error={!!errors.email}
          helperText={errors.email}
        />
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button type="submit" variant="contained" disabled={saving} sx={{ alignSelf: 'flex-start' }}>
            Save changes
          </Button>
          {savedMessage && (
            <Typography variant="body2" color="success.main">
              Saved
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}
