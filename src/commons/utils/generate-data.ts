import { addDays, format, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { it } from "node:test";
import { currencyFormatter } from "./formatter";
import { PaginatedResult, ProfitCalculation } from "../models/Data";

export function generateServiceWeek() {
  const today = new Date();
  
  const firstDayOfWeek = startOfWeek(today, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }).map((_, index) =>
    addDays(firstDayOfWeek, index)
  );

  return weekDays;
}

export const setTimeSelectedDate = (date: Date, time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  
  const newDate = new Date(date);
  //const utc = hours - 3
  newDate.setHours(hours, minutes, 0, 0);

  return newDate;
}

export const convertHoursToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);

  return hours * 60 + minutes;
}

export const convertMinutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
  
  return `${formattedHours}:${formattedMinutes}`;
}

export const getCurrentPeriod = (date?: Date): string => format(date ?? new Date(), 'MM-yyyy');

export function calculateProfitProjection(item: ProfitCalculation) {
  const totalCost = item.paidValue + item.totalCosts;
  const discounts = [0.10, 0.15, 0.20];

  const projection = discounts.map((discount) => {
    const resalePrice = item.fipeValue * (1 - discount);
    const projectedProfit = resalePrice - totalCost;

    return {
      discount: discount * 100,
      resalePrice,
      projectedProfit,
    }
  });

  return {
    totalCost,
    projection,
  };
}

export function paginate<T>(array: T[], pageNumber: number, pageSize: number = 10): PaginatedResult<T> {
  const totalItems = array.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  
  const validPageNumber = Math.max(1, Math.min(pageNumber, totalPages || 1));
  
  const startIndex = (validPageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  const paginatedData = array.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    currentPage: validPageNumber,
    totalPages: totalPages,
    totalItems: totalItems,
  };
}