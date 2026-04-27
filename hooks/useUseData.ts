// hooks/useUserData.tsx
"use client";
export const dynamic = 'force-dynamic';

import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { Utilisateur } from "../types/utilisateur";

export function useUserData() {
  const [data, setData] = useState<Utilisateur | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.id) {
        setLoading(false);
        return;
      }

      const { data: utilisateurData } = await supabase
        .from('utilisateurs')
        .select('*')
        .eq('userId', user.id)
        .single();

      setData(utilisateurData);
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveUserData = useCallback(async (updates: Partial<Utilisateur>) => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.id) return false;

      const { error } = await supabase
        .from('utilisateurs')
        .update(updates)
        .eq('userId', user.id);

      if (!error) {
        await fetchUserData();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      return false;
    } finally {
      setSaving(false);
    }
  }, [fetchUserData]);

  useEffect(() => {
    fetchUserData();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        fetchUserData();
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, [fetchUserData]);

  return {
    data,
    loading,
    saving,
    refetch: fetchUserData,
    saveUserData
  };
}
