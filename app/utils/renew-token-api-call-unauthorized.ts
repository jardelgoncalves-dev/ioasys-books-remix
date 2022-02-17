import { AxiosError } from 'axios';
import { redirect, Session } from 'remix';
import { api } from '~/api/api';
import { REFRESH_KEY, TOKEN_KEY } from './constants';
import { commitSession, destroySession, getSession } from './session';

async function renewToken(session: Session, redirectTo: string) {
  const { headers } = await api.post('/auth/refresh-token', {
    refreshToken: session.get(REFRESH_KEY),
  });

  session.set(TOKEN_KEY, headers['authorization']);
  session.set(REFRESH_KEY, headers['refresh-token']);

  api.defaults.headers.common['Authorization'] = `Bearer ${session.get(
    TOKEN_KEY,
  )}`;
  api.defaults.headers.common['refresh-token'] = `${session.get(REFRESH_KEY)}`;

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export async function renewTokenApiCallUnauthorized<T>(
  apiCall: () => Promise<T>,
  request: Request,
  redirectSuccess: string,
  redirectFailure: string,
): Promise<T | Response> {
  try {
    return await apiCall();
  } catch (error) {
    const session = await getSession(request.headers.get('Cookie'));

    if (
      (error as AxiosError).response &&
      (error as AxiosError).response?.status === 401 &&
      session.has(TOKEN_KEY) &&
      session.has(REFRESH_KEY)
    ) {
      return renewToken(session, redirectSuccess) as Promise<Response>;
    }

    return redirect(redirectFailure, {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    });
  }
}
