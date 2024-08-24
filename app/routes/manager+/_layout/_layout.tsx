import { Form, Link, NavLink, Outlet } from '@remix-run/react';

export default function DashboardLayout() {
  return (
    <div className="relative isolate flex min-h-svh w-full">
      <header className="fixed inset-y-0 left-0 flex w-52 flex-col gap-y-4 border-r p-2">
        <Link to="/" className="text-2xl">
          runde.tips
        </Link>
        <div>
          <NavLink to="/manager">Dashboard</NavLink>
        </div>
        <div className="grow" />
        <div>
          <Form action="/logout" method="post">
            <button type="submit">Log Out</button>
          </Form>
        </div>
      </header>
      <main className="pl-52">
        <Outlet />
      </main>
    </div>
  );
}
