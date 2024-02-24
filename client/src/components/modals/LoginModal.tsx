import React from 'react';
import { useUserContext } from '../../context/UserContext';
import { Container } from '@chakra-ui/react';
import Auth from '../../util/auth';
import WelcomeModal from './WelcomeModal';
import ButtonModal from './ButtonModal';
import LoginDisplay from '../UI/LoginDisplay';

export default function LoginModal() {
  const [loggedIn, setLoggedIn] = useUserContext();
  return (
    <>
      {!loggedIn && (
        <div>
          {Auth.returningUser() ? null : <WelcomeModal />}
          <ButtonModal
            chakraColor={'teal'}
            buttonContent="Log In"
            cypress="login-btn">
            <LoginDisplay setLoggedIn={setLoggedIn} />
          </ButtonModal>
        </div>
      )}
    </>
  );
}
