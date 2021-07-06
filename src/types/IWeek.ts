import { IRecipe } from "@/types/IRecipe";

export interface IWeek {
  id?: string;
  startDate?: Date | null;
  days: IRecipe[] | null[];
}
