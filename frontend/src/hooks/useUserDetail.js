import { useCallback, useEffect, useState } from 'react';
import { userApi } from '../api/userApi.js';

/**
 * Loads a single user (profile + addresses) and provides mutation helpers
 * that keep local state in sync without a full page refetch where possible.
 */
export function useUserDetail(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userApi.getUser(userId);
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveProfile = useCallback(
    async (profilePayload) => {
      const updated = await userApi.updateUser(userId, profilePayload);
      setUser(updated);
      return updated;
    },
    [userId],
  );

  const createAddress = useCallback(
    async (addressPayload) => {
      await userApi.addAddress(userId, addressPayload);
      await refresh();
    },
    [userId, refresh],
  );

  const editAddress = useCallback(
    async (addressId, addressPayload) => {
      await userApi.updateAddress(userId, addressId, addressPayload);
      await refresh();
    },
    [userId, refresh],
  );

  const removeAddress = useCallback(
    async (addressId) => {
      await userApi.deleteAddress(userId, addressId);
      await refresh();
    },
    [userId, refresh],
  );

  return { user, loading, error, refresh, saveProfile, createAddress, editAddress, removeAddress };
}
