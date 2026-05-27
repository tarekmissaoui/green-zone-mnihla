import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";

export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "greenzonemnihla@gmail.com";
const LOCAL_PASSWORD_KEY = "gzm_admin_password";
const LOCAL_SESSION_KEY = "gzm_admin_session";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

function getLocalPassword() {
  return localStorage.getItem(LOCAL_PASSWORD_KEY) || "123456789";
}

export function useAdminAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(supabase));
  const isCloudAuth = Boolean(supabase);

  useEffect(() => {
    if (!supabase) {
      const session = localStorage.getItem(LOCAL_SESSION_KEY);
      setUser(session === ADMIN_EMAIL ? { email: ADMIN_EMAIL, local: true } : null);
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user && data.user.email === ADMIN_EMAIL ? data.user : null);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user?.email === ADMIN_EMAIL ? session.user : null;
      setUser(nextUser);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const api = useMemo(() => ({
    isCloudAuth,
    user,
    loading,
    async signIn(email, password) {
      if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        throw new Error("Cet email n'est pas autorise pour l'administration.");
      }

      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error(error.message);
        if (data.user?.email !== ADMIN_EMAIL) {
          await supabase.auth.signOut();
          throw new Error("Cet utilisateur n'est pas autorise.");
        }
        setUser(data.user);
        return;
      }

      if (password !== getLocalPassword()) {
        throw new Error("Mot de passe incorrect.");
      }
      localStorage.setItem(LOCAL_SESSION_KEY, ADMIN_EMAIL);
      setUser({ email: ADMIN_EMAIL, local: true });
    },
    async signOut() {
      if (supabase) await supabase.auth.signOut();
      localStorage.removeItem(LOCAL_SESSION_KEY);
      setUser(null);
    },
    async changePassword(currentPassword, nextPassword) {
      if (nextPassword.length < 8) {
        throw new Error("Le nouveau mot de passe doit contenir au moins 8 caracteres.");
      }

      if (supabase) {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: ADMIN_EMAIL,
          password: currentPassword
        });
        if (loginError) throw new Error("Mot de passe actuel incorrect.");
        const { error } = await supabase.auth.updateUser({ password: nextPassword });
        if (error) throw new Error(error.message);
        return;
      }

      if (currentPassword !== getLocalPassword()) {
        throw new Error("Mot de passe actuel incorrect.");
      }
      localStorage.setItem(LOCAL_PASSWORD_KEY, nextPassword);
    }
  }), [isCloudAuth, loading, user]);

  return api;
}
