import { supabase } from "@/supabase";
import type { IFormData, IRecipe, IRecipeBase } from "@/types/IRecipe";
import { getUser } from "@/db/user";

const createArrayOfInput = (input: string) => {
  const list = input.split("\n");
  return list.filter((item) => item !== "");
};

const createIngredients = (input: string) => {
  const list = createArrayOfInput(input);
  return list.map((ingredient) => {
    const matches = ingredient.split(/(\d+)/).filter(Boolean);
    if (matches.length > 0 && !isNaN(parseFloat(matches[0]))) {
      return {
        amount: parseFloat(matches[0]),
        title: matches[1],
      };
    }
    return {
      title: ingredient,
    };
  });
};

export const getAll = async () => {
  const user = await getUser();
  if (!user) {
    throw "No user";
  }

  const { data, error, status } = await supabase
    .from("recipes")
    .select(`title, id`)
    .eq("user_id", user.id)
    .order("title");

  if (error && status !== 406) throw new Error(error.message);

  return data as IRecipeBase[];
};

export const getDetails = async (id: string) => {
  const user = await getUser();
  if (!user) {
    throw "No user";
  }

  const { data, error, status } = await supabase
    .from("recipes")
    .select(`title, id, content, ingredients, preperationTime`)
    .match({ id, user_id: user.id })
    .single();

  if (error && status !== 406) throw new Error(error.message);

  return data as IRecipe;
};

export const edit = async (formData: IFormData) => {
  const user = await getUser();
  if (!user) {
    throw "No user";
  }
  const content = createArrayOfInput(formData.content);
  const ingredients = createIngredients(formData.ingredients);

  let updates: IRecipe = {
    user_id: user.id,
    title: formData.title,
    preperationTime: formData.preperationTime,
    content,
    ingredients,
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

  return data as IRecipe;
};

export const remove = async (id: string) => {
  const user = await getUser();
  if (!user) {
    throw "No user";
  }

  const { error, status } = await supabase
    .from("recipes")
    .delete()
    .match({ id, user_id: user.id });

  if (error && status !== 406) throw new Error(error.message);
};
