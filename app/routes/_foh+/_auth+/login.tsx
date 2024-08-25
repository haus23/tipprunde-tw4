import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { login, requireAnonymous } from '#utils/.server/auth';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireAnonymous(request);
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return await login(request);
};

export default function LoginRoute() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="p-4">
      <h2 className="text-2xl">Log In</h2>
      <Form method="post">
        <fieldset>
          <div className="flex flex-col gap-y-2 py-4">
            <label htmlFor="passwd">Manager Passwort</label>
            <input type="password" name="passwd" id="passwd" />
          </div>
          {actionData?.errors && <div>{actionData.errors.passwd}</div>}
          <button type="submit">Anmelden</button>
        </fieldset>
      </Form>
    </div>
  );
}
