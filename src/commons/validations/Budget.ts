import z from 'zod'

export const budgetFormSchema = z.object({
  description: z.string({
    required_error: 'Descrição obrigatória!',
  }).trim()
    .min(2, 'Descrição inválida'),
  amount: z.string({
    required_error: 'A quantidade é obrigatório!',
  }).trim().min(1, 'A quantidade precisa ser no mínimo 1'),
  price: z.coerce.number({
    required_error: 'A quantidade é obrigatório!'
  }).min(1, 'A quantidade precisa ser no mínimo 1'),
})