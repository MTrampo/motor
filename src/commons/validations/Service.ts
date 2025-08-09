import z from 'zod'

export const serviceFormSchema = z.object({
  duration: z.string({
    required_error: 'Descrição obrigatória!',
  }).trim()
    .min(2, 'Descrição inválida'),
  time: z.string({
    required_error: 'A quantidade é obrigatório!',
  }).trim().min(2, 'A quantidade precisa ser no mínimo 1'),
  day: z.coerce.date({
    required_error: 'data obrigatoria'
  })
})