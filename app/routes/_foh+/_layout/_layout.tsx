import { Link, NavLink, Outlet } from '@remix-run/react';
import { Logo } from '#components/logo';

export default function FohLayout() {
  return (
    <div className="relative isolate min-h-svh w-full">
      <header className="flex items-center gap-x-4 border-b py-2 pr-4 pl-2">
        <Link to="/" className="text-2xl">
          <Logo />
        </Link>
        <div>
          <NavLink to="/willkommen">Startseite</NavLink>
        </div>
        <div className="grow" />
        <div>
          <NavLink to="/manager">Manager</NavLink>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
