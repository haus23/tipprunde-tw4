import { createCookieSessionStorage } from '@remix-run/node';
import type { Theme } from '#utils/theme';

const prefsSessionStore = createCookieSessionStorage<{ theme: Theme }>({
  cookie: {
    name: '__prefs',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.PREFS_SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export const { commitSession, destroySession, getPrefsSession } = {
  ...prefsSessionStore,
  getPrefsSession: (request: Request) =>
    prefsSessionStore.getSession(request.headers.get('Cookie')),
};
