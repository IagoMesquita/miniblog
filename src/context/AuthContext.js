import { createContext, useContext } from 'react';

const AuthContext = createContext();

// Provider -----------------------------------------------------------

export function AuthProvider({ children, value }) {
  return (
    <AuthContext.Provider value={ value }>
      { children }
    </AuthContext.Provider>

  )
};

// Anteriormente fizemos uma hook para o context/useContext, agora faremos tudo aqui.

export function useAuthValue() {
  return useContext(AuthContext);
};
