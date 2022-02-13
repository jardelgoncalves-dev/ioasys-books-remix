import type { LoaderFunction, ActionFunction } from 'remix';

import { logout } from '~/useCases/logout';

export const action: ActionFunction = async ({ request }) => {
  return logout(request);
};

export const loader: LoaderFunction = async ({ request }) => {
  return logout(request);
};

export default () => null;
