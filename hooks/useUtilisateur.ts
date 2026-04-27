// hooks/useUtilisateur.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Utilisateur } from "../types/utilisateur";

export function useUtilisateur() {
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchUtilisateur = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setUtilisateur(null);
        return;
      }

      const { data, error } = await supabase
        .from('utilisateurs')
        .select('*')
        .eq('userId', user.id)
        .single();

      if (data) {
        setUtilisateur(data);
      }
    } catch (error) {
      console.error('Erreur utilisateur:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUtilisateur = async (updates: Partial<Utilisateur>) => {
    setUpdating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { error } = await supabase
        .from('utilisateurs')
        .update(updates)
        .eq('userId', user.id);

      if (!error) {
        await fetchUtilisateur();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur update:', error);
      return false;
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchUtilisateur();
  }, []);

  return { 
    utilisateur, 
    loading, 
    updating, 
    fetchUtilisateur, 
    updateUtilisateur 
  };
}
