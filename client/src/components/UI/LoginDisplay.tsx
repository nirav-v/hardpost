import React, { useState } from 'react';
import SignUpForm from '../forms/SignUpForm';
import LoginForm from '../forms/LoginForm';
import Auth from '../../util/auth';

export default function LoginDisplay({
  setLoggedIn,
}: {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [showSignUpForm, setShowSignUpForm] = useState(!Auth.returningUser());

  return (
    <>
      {showSignUpForm ? (
        <SignUpForm
          setLoggedIn={setLoggedIn}
          showSignUpForm={showSignUpForm}
          setShowSignUpForm={setShowSignUpForm}
        />
      ) : (
        <LoginForm
          setLoggedIn={setLoggedIn}
          showSignUpForm={showSignUpForm}
          setShowSignUpForm={setShowSignUpForm}
        />
      )}
    </>
  );
}
