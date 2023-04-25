import { supabase } from "@/supabase";
import { getSession } from "@/db/user";

export const getAll = async () => {
  const session = await getSession();
  if (!session) {
    throw "No user";
  }

  const { data, error, status } = await supabase
    .from("weekmenu")
    .select(`id, archived, weekmenu_days(id, recipes(title, id))`)
    .match({ user_id: session.user.id, archived: false })
    .order("inserted_at", { foreignTable: "weekmenu_days" });

  if (error && status !== 406) throw new Error(error.message);
  return data;
};

export const getArchive = async () => {
  const session = await getSession();
  if (!session) {
    throw "No user";
  }

  const { data, error, status } = await supabase
    .from("weekmenu")
    .select(`id, weekmenu_days(id, recipes(title, id))`)
    .match({ user_id: session.user.id, archived: true })
    .order("inserted_at", { foreignTable: "weekmenu_days" });

  if (error && status !== 406) throw new Error(error.message);
  return data;
};

export const update = async (id: string, archived: boolean) => {
  const session = await getSession();
  if (!session) {
    throw "No user";
  }

  const updates = {
    archived,
  };

  const { data, error, status } = await supabase
    .from("weekmenu")
    .update(updates)
    .match({
      id: id,
      user_id: session.user.id,
    })
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
    .from("weekmenu_days")
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
    .from("weekmenu_days")
    .delete()
    .match({
      id: id,
      user_id: session.user.id,
    });

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
    .from("weekmenu_days")
    .update(updates)
    .match({
      id: id,
      user_id: session.user.id,
    })
    .single();

  if (error && status !== 406) throw new Error(error.message);

  return data;
};
