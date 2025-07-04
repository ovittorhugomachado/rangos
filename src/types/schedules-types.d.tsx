import { DayOfWeek } from "./restaurante-data-types.d";

export type TimeRange = { start: string; end: string };

export type OpeningHour = {
    day: DayOfWeek;
    timeRanges: TimeRange[];
};