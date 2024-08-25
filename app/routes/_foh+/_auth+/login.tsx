import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { requireAnonymous } from '~/utils/.server/auth';

export const meta: MetaFunction = () => {
  return [
    { title: 'Log In - runde.tips' },
    { name: 'description', content: 'Anmeldeseite der Tipprunde' },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireAnonymous(request);

  return null;
};

export default function LoginRoute() {
  return (
    <div className="p-4">
      <h2 className="text-2xl">Log In</h2>
    </div>
  );
}
