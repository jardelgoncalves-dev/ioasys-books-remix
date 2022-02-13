import {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
  useActionData,
} from 'remix';

import { Logo } from '~/components/Icon/Logo';
import { Input } from '~/components/Input';
import { Tooltip } from '~/components/Tooltip';

import { getSession } from '~/utils/session';
import { login } from '~/useCases/login';
import { TOKEN_KEY } from '~/utils/constants';

import type { Credentials } from '~/interfaces/credentials';
import { HandleError } from '~/interfaces/handle-error';
import loginStyle from '~/styles/pages/login.css';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: loginStyle,
  },
];
export const meta: MetaFunction = () => ({
  title: 'Login',
});

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  if (session.has(TOKEN_KEY)) {
    return redirect('/');
  }
  return {};
};

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') return {};
  const data = Object.fromEntries(await request.formData());

  return await login(data as Credentials, '/');
};

type ActionData = {
  formPayload: Credentials;
  error: HandleError;
};

export default function Login() {
  const actionData = useActionData<ActionData>();

  return (
    <main className="container">
      <h1>
        <Logo /> Books
      </h1>
      <form method="post">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Email"
          error={actionData?.error?.email}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="Senha"
          error={actionData?.error?.password}
        >
          <div className="button-wrap">
            <button type="submit">Entrar</button>
          </div>
        </Input>
        {!!actionData?.error?.requestError && (
          <Tooltip
            name="request"
            text={actionData?.error?.requestError?.message}
          />
        )}
      </form>
    </main>
  );
}
