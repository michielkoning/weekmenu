import { IRecipe } from "@/interfaces/IRecipe";

export interface IWeek {
  id?: string;
  startDate?: Date | null;
  days: IRecipe[] | null[];
}
