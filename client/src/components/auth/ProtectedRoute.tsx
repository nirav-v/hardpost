// check if the user is logged in before rendering the children, if not navigate back to the base route

import { PropsWithChildren } from 'react';

import LoginDisplay from '../UI/LoginDisplay';
import { useUserContext } from '../../context/UserContext';

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const [loggedIn, setLoggedIn] = useUserContext();

  if (!loggedIn) {
    return <LoginDisplay setLoggedIn={setLoggedIn} />;
  }
  return children;
}
