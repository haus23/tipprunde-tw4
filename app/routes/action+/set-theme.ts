import type { ActionFunctionArgs } from '@remix-run/node';
import * as v from 'valibot';

import { commitSession, getPrefsSession } from '#utils/.server/prefs.session';
import { themeSchema } from '#utils/theme';

export async function loader() {
  throw new Response('Not found', { status: 404 });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const themeResult = v.safeParse(themeSchema, Object.fromEntries(formData));

  const session = await getPrefsSession(request);
  let cookieString: string;
  if (themeResult.success) {
    session.set('theme', themeResult.output);
    cookieString = await commitSession(session);
  } else {
    throw new Error('Invalid theme.');
  }

  return new Response(null, { headers: { 'Set-Cookie': cookieString } });
}
