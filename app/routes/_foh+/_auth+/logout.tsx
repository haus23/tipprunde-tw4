import { redirect } from '@remix-run/node';

export const loader = () => {
  throw redirect('/');
};

export const action = () => {
  throw redirect('/');
};
