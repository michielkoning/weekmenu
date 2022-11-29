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
  return data as IWeekMenuResponse;
};

export const upsert = async (formData: IWeekMenuResponse) => {
  const session = await getSession();
  if (!session) {
    throw "No user";
  }

  const updates: IWeekMenuResponse = {
    id: formData.id,
    user_id: session.user.id,
    recipes: formData.recipes,
  };

  const { data, error, status } = await supabase
    .from("weekmenu")
    .upsert(updates)
    .select()
    .single();

  if (error && status !== 406) throw new Error(error.message);

  return data as IWeekMenuResponse;
};
