import { redirect } from 'remix';

import { REFRESH_KEY, TOKEN_KEY } from '~/utils/constants';

import { api } from '~/api/api';
import { getSession, commitSession } from '~/utils/session';
import { LoginValidator } from '~/utils/validators/login';

import type { Credentials } from '~/interfaces/credentials';
import { handleError } from '~/utils/handle-error';

export async function login(credentials: Credentials, redirectTo: string) {
  try {
    const { email, password } = LoginValidator.parse(credentials);

    const { headers } = await api.post('/auth/sign-in', {
      email,
      password,
    });

    const session = await getSession();
    session.set(TOKEN_KEY, headers['authorization']);
    session.set(REFRESH_KEY, headers['refresh-token']);

    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (error) {
    return {
      formPayload: credentials,
      error: handleError(error),
    };
  }
}
