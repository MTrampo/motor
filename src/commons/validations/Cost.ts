import z from 'zod'

export const registerCostFormSchema = z.object({
  guid: z.coerce.string<string>(),
  description: z.string()
    .trim()
    .nonempty('Descrição obrigatória!')
    .min(2, 'Descrição inválida'),
  type: z.coerce.number<number>(),
  value: z.coerce.number<number>()
    .nonnegative('O valor não pode ser negativo')
    .min(1, 'O valor precisa ser no mínimo R$ 5,00'),
  paymentDate: z.coerce.date<Date>()
})