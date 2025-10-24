import z from 'zod'
import { SalePaymentMethodEnum } from '../enums/Payment';

export const vehicleSell = z.object({
  sell: z.coerce.date<Date>("Data de pagamento obrigatória."),
  price: z.coerce.number<number>("Valor recebido obrigatório.")
    .nonnegative('O valor não pode ser negativo.'),
  paymentMethod: z.coerce.number<SalePaymentMethodEnum>("Método de pagamento obrigatório."),
  note: z.string().trim().optional()
});