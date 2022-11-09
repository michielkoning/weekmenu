import { supabase } from "@/supabase";
import type { IRecipe, IRecipeDetails } from "@/types/IRecipe";
import { getSession } from "@/db/user";

export const getAll = async () => {
  const session = await getSession();
  if (!session) {
    throw "No user";
  }

  const { data, error, status } = await supabase
    .from("recipes")
    .select(`title, id`)
    .eq("user_id", session.user.id)
    .order("title");

  if (error && status !== 406) throw new Error(error.message);

  return data as IRecipe[];
};

export const getDetails = async (id: string) => {
  const session = await getSession();
  if (!session) {
    throw "No user";
  }

  const { data, error, status } = await supabase
    .from("recipes")
    .select(`title, id, content, ingredients, preperationTime`)
    .match({ id, user_id: session.user.id })
    .single();

  if (error && status !== 406) throw new Error(error.message);

  return data as IRecipeDetails;
};

export const upsert = async (formData: IRecipeDetails) => {
  const session = await getSession();
  if (!session) {
    throw "No user";
  }

  let updates: IRecipeDetails = {
    user_id: session.user.id,
    title: formData.title,
    preperationTime: formData.preperationTime,
    content: formData.content,
    ingredients: formData.ingredients,
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

  return data as IRecipeDetails;
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
