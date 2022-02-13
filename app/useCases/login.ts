import { redirect } from 'remix';

import { api } from '~/api/api';
import { getSession, commitSession } from '~/utils/session';
import { LoginValidator } from '~/utils/validators/login';
import { REFRESH_KEY, TOKEN_KEY, USER_LOGGED } from '~/utils/constants';

import type { Credentials } from '~/interfaces/credentials';
import { handleError } from '~/utils/handle-error';

export async function login(credentials: Credentials, redirectTo: string) {
  try {
    const { email, password } = LoginValidator.parse(credentials);

    const { headers, data } = await api.post('/auth/sign-in', {
      email,
      password,
    });

    const session = await getSession();
    session.set(TOKEN_KEY, headers['authorization']);
    session.set(REFRESH_KEY, headers['refresh-token']);
    session.set(USER_LOGGED, data.name);

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
