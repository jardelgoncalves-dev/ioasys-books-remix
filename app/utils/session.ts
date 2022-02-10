import { createCookieSessionStorage } from 'remix';
import { COOKIE_SESSION_NAME } from '~/utils/constants';

const { commitSession, destroySession, getSession } =
  createCookieSessionStorage({
    cookie: {
      name: COOKIE_SESSION_NAME,
      secure: process.env.NODE_ENV === 'production',
      secrets: [process.env.SECRETE_SESSION || '@session/test'],
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
      httpOnly: true,
    },
  });

export { getSession, commitSession, destroySession };
