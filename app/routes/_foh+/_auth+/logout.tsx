import { type ActionFunctionArgs, redirect } from '@remix-run/node';
import { logout } from '~/utils/.server/auth';

export const loader = () => {
  throw redirect('/');
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const referer = request.headers.get('Referer') || '/';
  const isManagerRoute = new URL(referer).pathname.startsWith('/manager');

  if (isManagerRoute) {
    request.headers.delete('Referer');
  }

  await logout(request, '/');
};
