import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import SocketContext from './Socket';
import api from '../apifetch/axiosConfig';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);


  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("Socket URL",SOCKET_URL)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Inside Check Auth")
        const response = await api.get("/users/me"); // ✅ Fetch user from backend
        console.log("Response From Backend",response)
        setIsAuthenticated(true);
        setUserId(response.data.data.id);
      } catch (error) {
        console.error("Error fetching user data:",error)
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // Only connect if the user is logged in or you have a token
    console.log("Trying to connect", userId, isAuthenticated)
    if (isAuthenticated && userId) {
        
      const newSocket = io(SOCKET_URL, {
        query: { userId },
        transports: ['websocket', 'polling'],
      });

      newSocket.on('connect', () => {
        console.log(`Socket connected: ${newSocket.id}`);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      setSocket(newSocket);

      // Cleanup on unmount
      return () => {
        newSocket.disconnect();
      };
    }
  }, [isAuthenticated, userId]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
