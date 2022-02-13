import { AxiosError } from 'axios';
import { api } from '~/api/api';
import { REFRESH_KEY, TOKEN_KEY } from './constants';
import { commitSession, getSession } from './session';

export async function retryApiCallUnauthorized<T>(
  apiCall: () => Promise<T>,
  isRetry?: boolean,
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    if (isRetry) throw error;
    if (
      (error as AxiosError).response &&
      (error as AxiosError).response?.status === 401 &&
      api.defaults.headers.common['refresh-token']
    ) {
      const { headers } = await api.post('/auth/refresh-token', {
        refreshToken: api.defaults.headers.common['refresh-token'],
      });

      const session = await getSession();
      session.set(TOKEN_KEY, headers['authorization']);
      session.set(REFRESH_KEY, headers['refresh-token']);

      await commitSession(session);

      api.defaults.headers.common['Authorization'] = `Bearer ${session.get(
        TOKEN_KEY,
      )}`;
      api.defaults.headers.common['refresh-token'] = `${session.get(
        REFRESH_KEY,
      )}`;

      return retryApiCallUnauthorized(apiCall, true);
    }

    throw error;
  }
}
