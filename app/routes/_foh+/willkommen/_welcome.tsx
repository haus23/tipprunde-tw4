import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Willkommen - runde.tips' },
    {
      name: 'description',
      content: 'Die legendäre Tipprunde der Kneipe Marie 23',
    },
  ];
};

export default function WelcomeRoute() {
  return (
    <div className="p-4">
      <h2 className="text-2xl">Willkommen!</h2>
    </div>
  );
}
