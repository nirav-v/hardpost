// check if the user is logged in before rendering the children, if not navigate back to the base route

import { PropsWithChildren } from 'react';
import Auth from '../../util/auth';

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const isLoggedIn = Auth.isLoggedIn();
  console.log('logged in', isLoggedIn);
  if (!isLoggedIn) {
    return <div>you must be logged in to view this page</div>;
  }
  return children;
}
