import type { LoaderFunction } from '@remix-run/node';
import { Form, Link, NavLink, Outlet } from '@remix-run/react';
import { Logo } from '#components/logo';
import { Button } from '#components/ui/button/button';
import { requireAdmin } from '#utils/.server/auth';

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdmin(request);
  return null;
};

export default function ManagerLayout() {
  return (
    <div className="relative isolate flex min-h-svh w-full">
      <header className="fixed inset-y-0 left-0 flex w-52 flex-col gap-y-4 border-r p-2">
        <Link to="/" className="text-2xl">
          <Logo />
        </Link>
        <div>
          <NavLink to="/manager">Dashboard</NavLink>
        </div>
        <div className="grow" />
        <div>
          <Form action="/logout" method="post">
            <Button type="submit">Log Out</Button>
          </Form>
        </div>
      </header>
      <main className="py-2 pl-52">
        <Outlet />
      </main>
    </div>
  );
}
