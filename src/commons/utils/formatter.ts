import { format, formatDistanceToNow, isThisWeek, isToday, isYesterday, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Timestamp } from 'firebase-admin/firestore'

// Formatação de datas e horas

export const dateFormatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' })

export const dateTimeFormatter = (date: Date) => {
  return format(date, "d 'de' MMM. 'de' yyyy, HH:mm", { locale: ptBR })
}

export const dateFormatterSummary = (date: Date) => {
  return format(date, "dd MMM yyyy '•' HH':'mm", { locale: ptBR })
}

export const dateFormatterDynamic = (date: Date) => {
  if (isToday(date)) {
    return `hoje às ${format(date, "HH':'mm")}`
  }

  if (isYesterday(date)) {
    return `ontem às ${format(date, "HH':'mm")}`
  }

  if (isThisWeek(date)) {
    return `${format(date, "EEEE", { locale: ptBR })} às ${format(date, "HH':'mm")}`
  }

  return `${format(date, "dd/MM/YYYY", { locale: ptBR })} às ${format(date, "HH':'mm")}`
}

export const formatLastUpdated = (date: Date | null): string => {
  if (!date) {
    return 'Sem registro da última entrada';
  }

  const now = new Date();
  const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);
  
  if (diffInMinutes < 60) {
    return `atualizado ${formatDistanceToNow(date, { addSuffix: true, locale: ptBR })}`;
  }
  
  const diffInHours = diffInMinutes / 60;
  if (diffInHours < 24) {
    return `atualizado a ${Math.round(diffInHours)}h atrás`;
  }
  
  if (isToday(date)) {
    return `atualizado hoje às ${format(date, 'HH:mm', { locale: ptBR })}`;
  }
  
  if (isYesterday(date)) {
    return `atualizado ontem às ${format(date, 'HH:mm', { locale: ptBR })}`;
  }
  
  if (isThisWeek(date)) {
    return `atualizado ${format(date, 'EEEE', { locale: ptBR })} às ${format(date, 'HH:mm', { locale: ptBR })}`;
  }
  
  return `atualizado em ${format(date, 'dd/MM/yyyy', { locale: ptBR })} às ${format(date, 'HH:mm', { locale: ptBR })}`;
};

export const timeToDisplayFormatter = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':').map(Number)

  if (isNaN(hours) || isNaN(minutes)) return '00h00min'

  if (hours === 0 && minutes > 0) return `${minutes}min`
  if (hours > 0 && minutes === 0) return `${hours}h`
  if (hours > 0 && minutes > 0) return `${hours}h${minutes}min`

  return '00h00min'
}

export const formatDurationInput = (input: string): string => {
  const digitsOnly = input.replace(/\D/g, '')

  if (digitsOnly.length === 0) return ''

  const limitedDigits = digitsOnly.slice(0, 4)

  let formatted = limitedDigits
  if (limitedDigits.length > 2) {
    formatted = `${limitedDigits.slice(0, 2)}:${limitedDigits.slice(2)}`
  }

  if (formatted.length === 5) {
    const [hours, minutes] = formatted.split(':').map(Number)

    if (hours === 0 && minutes < 30) {
      return '00:30'
    }
  }

  return formatted
}

export const timeFormatter = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)

  return hours < 1 ? `${minutes}m` : `${hours}h ${minutes}m`
}

// Formatação de moeda e números

export const formatNumber = new Intl.NumberFormat('pt-BR')

export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

export const formatCurrencyInput = (value: string | number): string => {
  const float = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value

  if (isNaN(float)) return 'R$ 0,00'

  return float.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
}

// Formatação de textos

export const normalizeCurrencyValue = (formattedValue: string): number => {
  const cleaned = formattedValue.replace(/\D/g, '')
  const number = parseFloat(cleaned) / 100
  return Number(number.toFixed(2))
}

export const fullNameFormatter = (name: string) => {
  return name.toLowerCase()
    .split(" ")
    .map(word => (word.length > 3 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase()))
    .join(" ");
}

export const nameFormatter = (fullName: string) => {
  const nameParts = fullName.trim().split(/\s+/)

  if (nameParts.length === 1) return nameParts[0]

  const firstName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
  const lastName = nameParts[nameParts.length - 1].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].slice(1).toLowerCase();

  return `${firstName} ${lastName}`
};

// Formatação de telefone

export const phoneFormatter = (value: string) => {
  value = value.replace(/\D/g, "")
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2")
  value = value.replace(/(\d{5})(\d)/, "$1-$2")

  return value
}