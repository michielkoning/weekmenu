import { IRecipe } from "@/types/IRecipe";
import { DocumentReference } from "firebase/firestore";

export interface IWeek {
  id?: string;
  startDate?: Date | null;
  days: IRecipe[] | null[];
  recipes: IRecipe[] | DocumentReference[] | null[];
}
