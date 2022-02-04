import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from 'remix';
import { Logo } from '~/components/Icon/Logo';

import { Input } from '~/components/Input';

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

export const loader: LoaderFunction = async () => ({});
export const action: ActionFunction = async () => ({});

export default function Login() {
  return (
    <main className="container">
      <h1>
        <Logo /> Books
      </h1>
      <form method="post">
        <Input label="Email" type="email" name="email" placeholder="Email" />
        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="Senha"
        >
          <div className="button-wrap">
            <button type="submit">Entrar</button>
          </div>
        </Input>
      </form>
    </main>
  );
}
