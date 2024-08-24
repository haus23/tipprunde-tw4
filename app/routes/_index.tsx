import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'runde.tips' },
    { name: 'description', content: 'Tipprunde der Marie 23' },
  ];
};

export default function Index() {
  return (
    <div className="p-4 font-sans">
      <h1 className="text-3xl">runde.tips</h1>
    </div>
  );
}
