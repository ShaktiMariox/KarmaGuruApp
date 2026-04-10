// NetworkProvider.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

// 1️⃣ Define context type
interface NetworkContextType {
  isConnected: boolean;
}

// 2️⃣ Create context with default value
export const NetworkContext = createContext<NetworkContextType>({
  isConnected: true,
});

// 3️⃣ Define provider props
interface NetworkProviderProps {
  children: ReactNode;
}

// 4️⃣ NetworkProvider component
export const NetworkProvider = ({ children }: NetworkProviderProps) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    let previousConnection = true; // Track previous connection to avoid repeated alerts

    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const connected = state.isConnected ?? true;
      setIsConnected(connected);

      // Only alert when going offline
      if (!connected && previousConnection) {
        Alert.alert('No Internet', 'Please check your internet connection');
      }

      previousConnection = connected;
    });

    return () => unsubscribe();
  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
    </NetworkContext.Provider>
  );
};