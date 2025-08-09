import z from 'zod'

export const selectCustomerFormSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: 'Selecione um cliente!',
  })
})

export const registerCustomerFormSchema = z.object({
  name: z.string({
    required_error: 'O nome do cliente é obrigatório!',
  }).trim()
    .min(2, 'Nome de cliente inválido'),
  whatsapp: z.string({
    required_error: 'O número do cliente é obrigatório!',
  }).trim()
    .min(11, 'Whatsapp do cliente inválido')
    .max(11, 'Whatsapp do cliente inválido'),
})