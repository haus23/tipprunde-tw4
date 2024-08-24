import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'Dashboard - Tipprunde Manager' }];
};

export default function DashboardRoute() {
  return (
    <div className="p-4">
      <h2 className="text-2xl">Dashboard</h2>
    </div>
  );
}
