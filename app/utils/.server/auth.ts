import { randomUUID } from 'node:crypto';
import { redirect } from '@remix-run/node';
import { commitSession, getSession } from './auth.session';

const validSessions: string[] = [];

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
  validSessions.push(sessionId);
  session.set('sessionId', sessionId);

  throw redirect('/manager', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export async function requireAnonymous(request: Request) {
  const session = await getSession(request);
  if (validSessions.includes(session.get('sessionId') || '')) {
    throw redirect('/');
  }
}

export async function requireAdmin(request: Request) {
  const session = await getSession(request);
  if (!validSessions.includes(session.get('sessionId') || '')) {
    throw redirect('/login');
  }
}
