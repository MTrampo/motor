import { addDays, format, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";

export function generateServiceWeek() {
  const today = new Date()
  
  const firstDayOfWeek = startOfWeek(today, { weekStartsOn: 0 })
  const weekDays = Array.from({ length: 7 }).map((_, index) =>
    addDays(firstDayOfWeek, index)
  )

  return weekDays
}

export const setTimeSelectedDate = (date: Date, time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  
  const newDate = new Date(date)
  //const utc = hours - 3
  newDate.setHours(hours, minutes, 0, 0)

  return newDate
}

export const convertHoursToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)

  return hours * 60 + minutes
}

export const convertMinutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = remainingMinutes.toString().padStart(2, '0')
  
  return `${formattedHours}:${formattedMinutes}`
}

export const getCurrentPeriod = (date?: Date): string => format(date ?? new Date(), 'MM-yyyy')