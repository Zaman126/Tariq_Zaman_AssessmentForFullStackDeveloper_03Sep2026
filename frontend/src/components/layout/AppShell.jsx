import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export function AppShell({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <PeopleAltIcon sx={{ mr: 1.5 }} />
          <Typography variant="h6" component="div">
            User &amp; Address Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}
