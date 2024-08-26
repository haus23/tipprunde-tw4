import { redirect } from '@remix-run/node';

export const loader = () => {
  throw redirect('/willkommen');
};

export default function RankingRoute() {
  return (
    <div className="p-4">
      <h2 className="text-2xl">Tabelle</h2>
    </div>
  );
}
