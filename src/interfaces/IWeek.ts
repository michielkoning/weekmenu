import { IWeekMenuItem } from "@/interfaces/IWeekMenuItemItem";

export interface IWeek {
  id?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  weekMenu: IWeekMenuItem[];
}
