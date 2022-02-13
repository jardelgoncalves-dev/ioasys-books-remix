import { redirect } from 'remix';
import { destroySession, getSession } from '~/utils/session';

export async function logout(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));

  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
}
