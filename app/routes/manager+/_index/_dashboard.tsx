import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { requireAdmin } from '~/utils/.server/auth';

export const meta: MetaFunction = () => {
  return [{ title: 'Dashboard - Tipprunde Manager' }];
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdmin(request);
  return null;
};

export default function DashboardRoute() {
  return (
    <div className="p-4">
      <h2 className="text-2xl">Dashboard</h2>
    </div>
  );
}
