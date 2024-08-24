import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Log In - runde.tips' },
    { name: 'description', content: 'Anmeldeseite der Tipprunde' },
  ];
};

export default function LoginRoute() {
  return (
    <div className="p-4">
      <h2 className="text-2xl">Log In</h2>
    </div>
  );
}
