import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function initialsOf(firstName, lastName) {
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();
}

export function UserTable({ users }) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow sx={{ '& th': { fontWeight: 600, bgcolor: 'grey.50' } }}>
            <TableCell>User</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="center">Addresses</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ width: 34, height: 34, fontSize: 14, bgcolor: 'primary.main' }}>
                    {initialsOf(user.firstName, user.lastName)}
                  </Avatar>
                  <Typography variant="body2" fontWeight={500}>
                    {user.firstName} {user.lastName}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={user.addressCount}
                  size="small"
                  color={user.addressCount > 0 ? 'primary' : 'default'}
                  variant={user.addressCount > 0 ? 'filled' : 'outlined'}
                />
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Manage profile & addresses">
                  <IconButton size="small" onClick={() => navigate(`/users/${user.id}`)}>
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
