import { supabase } from "@/supabase";
import { getSession } from "@/db/user";
import type { IWeekMenuResponse } from "@/interfaces/IWeekMenu";

export const getAll = async () => {
  const session = await getSession();
  if (!session) {
    throw "No user";
  }

  const { data, error, status } = await supabase
    .from("weekmenu")
    .select(`id, weekmenu_recipes(id, recipes(title, id))`)
    .eq("user_id", session.user.id)
    .single();

  if (error && status !== 406) throw new Error(error.message);
  return data;
};

export const addDay = async (weekmenuId: string) => {
  const session = await getSession();
  if (!session) {
    throw "No user";
  }

  const updates = {
    weekmenu: weekmenuId,
    user_id: session.user.id,
  };

  const { data, error, status } = await supabase
    .from("weekmenu_recipes")
    .insert(updates)
    .select()
    .single();

  if (error && status !== 406) throw new Error(error.message);

  return data;
};

export const removeDay = async (id: string) => {
  const session = await getSession();
  if (!session) {
    throw "No user";
  }

  const { data, error, status } = await supabase
    .from("weekmenu_recipes")
    .delete()
    .eq("id", id);

  if (error && status !== 406) throw new Error(error.message);

  return data;
};

export const updateDay = async (id: string, recipeId: string | null) => {
  const session = await getSession();
  if (!session) {
    throw "No user";
  }

  const updates = {
    recipe: recipeId,
  };

  const { data, error, status } = await supabase
    .from("weekmenu_recipes")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error && status !== 406) throw new Error(error.message);

  return data;
};
