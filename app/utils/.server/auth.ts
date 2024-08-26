import { randomUUID } from 'node:crypto';
import { redirect } from '@remix-run/node';
import { redirectBack } from 'remix-utils/redirect-back';

import { commitSession, destroySession, getSession } from './auth.session';

const validSessions = new Set<string>();

/**
 * Performs user login
 *
 * Expects manager password in the request body.
 * Returns error for invalid password. Otherwise redirects to manager dashboard.
 *
 * @param request Request object
 */
export async function login(request: Request) {
  const session = await getSession(request);

  const formData = await request.formData();
  const password = String(formData.get('passwd'));

  if (password !== process.env.MANAGER_PASSWD) {
    return {
      errors: { passwd: 'Falsches Passwort.' },
    };
  }

  // Create Server Session
  const sessionId = randomUUID();
  validSessions.add(sessionId);
  session.set('sessionId', sessionId);

  throw redirect('/manager', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

/**
 * Logs user out. If no redirectFallback is set, it returns the destroy session cookie
 * header. With redirectFallback it redirects to the referer or the fallback route
 * and destroys the session cookie itself.
 *
 * @param request Request object
 * @param redirectFallback Fallback URL if no referer in request
 * @returns destroy session cookie header
 */

export async function logout(request: Request, redirectFallback?: string) {
  const session = await getSession(request);
  const sessionId = session.get('sessionId');

  if (sessionId) {
    validSessions.delete(sessionId);
  }

  const headers = new Headers({
    'Set-Cookie': await destroySession(session),
  });

  if (redirectFallback) {
    throw redirectBack(request, { fallback: redirectFallback, headers });
  }

  return headers;
}

export async function requireAnonymous(request: Request) {
  const session = await getSession(request);
  if (validSessions.has(session.get('sessionId') || '')) {
    throw redirect('/');
  }
}

export async function requireAdmin(request: Request) {
  const session = await getSession(request);
  if (!validSessions.has(session.get('sessionId') || '')) {
    throw redirect('/login');
  }
}
