import { supabase } from "@/supabase";

export const getUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (data.session) {
    return data.session.user;
  }
  if (error) throw error;
  return null;
};

export const login = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
};

export const register = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
