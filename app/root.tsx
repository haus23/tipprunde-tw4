import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import { getPrefsSession } from '#utils/.server/prefs.session';

import styles from './styles.css?url';
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const prefs = await getPrefsSession(request);

  return {
    requestInfo: {
      theme: prefs.get('theme'),
    },
  };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const colorScheme =
    data?.requestInfo.theme?.colorScheme === 'system'
      ? undefined
      : data?.requestInfo.theme?.colorScheme;

  return (
    <html lang="de" {...(colorScheme && { className: colorScheme })}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Haus Marie 23 Tipprunde" />
        <title>Tipprunde - Haus23</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-app text-app antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
