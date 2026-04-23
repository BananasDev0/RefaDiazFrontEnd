import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { CircularProgress, Box } from '@mui/material';
import { supabase } from '../services/supabaseClient'; // Asumiendo que tienes supabaseClient configurado

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error fetching session:', error);
          setSession(null);
        } else {
          setSession(data.session);
        }
      } catch (err) {
        console.error('Unexpected error fetching session:', err);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        if (loading && (_event === 'SIGNED_IN' || _event === 'SIGNED_OUT' || _event === 'INITIAL_SESSION')) {
          setLoading(false);
        }
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [loading]); // Agregamos loading a las dependencias para re-evaluar si cambia externamente, aunque el flujo principal es interno.

  if (loading || session === undefined) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 