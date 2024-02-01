import { PropsWithChildren, createContext, useContext, useState } from 'react';

type UserContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const UserContext = createContext<UserContextType>([false, () => {}]);

export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }: PropsWithChildren) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={[loggedIn, setLoggedIn]}>
      {children}
    </UserContext.Provider>
  );
}
