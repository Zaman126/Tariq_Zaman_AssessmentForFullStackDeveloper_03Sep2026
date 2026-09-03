import { useCallback, useEffect, useState } from 'react';
import { userApi } from '../api/userApi.js';

/**
 * Loads the user list and exposes a `refresh` function so the list
 * screen can re-sync after a modification made elsewhere in the app.
 */
export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userApi.listUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { users, loading, error, refresh };
}
