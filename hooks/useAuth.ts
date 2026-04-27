// hooks/useAuth.tsx
"use client";
export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);



  const sendMagicLink = async (email: string) => {
   
    try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        
       // emailRedirectTo: `${location.origin}/`,
      //  emailRedirectTo: `${window.location.origin}/`,
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    return { error };
     } catch (error) {
    console.error('Magic link error:', error);
    return { error: { message: 'Erreur réseau' } };
  }
  };


  const logout = async () => {
    await supabase.auth.signOut();
    open("/auth/login", "_self");
  };



  return { 
    user, 
    session, 
    loading, 
    sendMagicLink, 
    logout 
  };
}
