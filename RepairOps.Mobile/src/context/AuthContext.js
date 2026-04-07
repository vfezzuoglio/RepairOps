import { createContext, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (data) => {
    await SecureStore.setItemAsync('token', data.token);
    await SecureStore.setItemAsync('role', data.role);
    await SecureStore.setItemAsync('fullName', data.fullName);
    await SecureStore.setItemAsync('userId', data.userId.toString());
    setUser(data);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('role');
    await SecureStore.deleteItemAsync('fullName');
    await SecureStore.deleteItemAsync('userId');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);