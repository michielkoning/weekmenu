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
    .select(`id, recipes`)
    .eq("user_id", session.user.id)
    .single();

  if (error && status !== 406) throw new Error(error.message);
  return data;
};

export const upsert = async (weekmenuId: string, recipeId: string | null) => {
  const session = await getSession();
  if (!session) {
    throw "No user";
  }

  const updates = {
    weekmenu: weekmenuId,
    user_id: session.user.id,
    recipe: recipeId,
  };

  const { data, error, status } = await supabase
    .from("weekmenu_recipes")
    .upsert(updates)
    .select()
    .single();

  if (error && status !== 406) throw new Error(error.message);

  return data;
};
