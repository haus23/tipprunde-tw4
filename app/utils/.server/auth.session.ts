import { createCookieSessionStorage } from '@remix-run/node';

export const SESSION_EXPIRATION_TIME = 60 * 60 * 24 * 30;

type SessionData = {
  sessionId: string;
};

const sessionStore = createCookieSessionStorage<SessionData>({
  cookie: {
    name: '__auth',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.AUTH_SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_EXPIRATION_TIME,
  },
});

export const { commitSession, destroySession, getSession } = {
  ...sessionStore,
  getSession: (request: Request) =>
    sessionStore.getSession(request.headers.get('Cookie')),
};
