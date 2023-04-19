import { supabase } from "@/supabase";
import type { IRecipe } from "@/interfaces/IRecipe";
import { getSession } from "@/db/user";

export const getAll = async () => {
  const session = await getSession();
  if (!session) {
    throw "No user";
  }

  const { data, error, status } = await supabase
    .from("recipes")
    .select(`title, id, content, ingredients, preperationTime, persons, source`)
    .eq("user_id", session.user.id);

  if (error && status !== 406) throw new Error(error.message);

  return data;
};

export const upsert = async (formData: IRecipe) => {
  const session = await getSession();
  if (!session) {
    throw "No user";
  }

  let updates: IRecipe = {
    user_id: session.user.id,
    title: formData.title,
    persons: formData.persons,
    preperationTime: formData.preperationTime,
    content: formData.content,
    ingredients: formData.ingredients,
    source: formData.source,
  };

  if (formData.id) {
    updates = {
      ...updates,
      id: formData.id,
    };
  }
  const { data, error, status } = await supabase
    .from("recipes")
    .upsert(updates)
    .select()
    .single();

  if (error && status !== 406) throw new Error(error.message);

  return data;
};

export const remove = async (id: string) => {
  const session = await getSession();
  if (!session) {
    throw "No user";
  }

  const { error, status } = await supabase
    .from("recipes")
    .delete()
    .match({ id, user_id: session.user.id });

  if (error && status !== 406) throw new Error(error.message);
};
