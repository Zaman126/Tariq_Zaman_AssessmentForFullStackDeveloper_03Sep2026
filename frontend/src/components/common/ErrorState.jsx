import { Alert, AlertTitle, Button } from '@mui/material';

export function ErrorState({ message, onRetry }) {
  return (
    <Alert
      severity="error"
      sx={{ my: 2 }}
      action={
        onRetry && (
          <Button color="inherit" size="small" onClick={onRetry}>
            Retry
          </Button>
        )
      }
    >
      <AlertTitle>Something went wrong</AlertTitle>
      {message}
    </Alert>
  );
}
