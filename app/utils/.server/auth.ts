import { redirect } from '@remix-run/node';
import { getSession } from './auth.session';

const validSessions: string[] = [];

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
