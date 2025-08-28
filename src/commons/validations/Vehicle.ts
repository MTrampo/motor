import z from 'zod'
import { CarOrigenEnum } from '../enums/Car';

export const vehicleFormSchema = z.object({
  licensePlate: z.string("Placa é obrigatória.")
    .trim()
    .min(6, "Placa inválida."),
  color: z.string("Cor é obrigatória.")
    .trim()
    .min(3, "Cor precisa ter no mínimo 3 caracteres."),
  brand: z.string("Marca é obrigatória.")
    .trim()
    .min(3, "Marca precisa ter no mínimo 3 caracteres."),
  model: z.string("Modelo é obrigatório.")
    .trim()
    .min(2, "Modelo precisa ter no mínimo 2 caracteres."),
  version: z.string().optional(),
  manufacturingYear: z.string("Ano fabricação é obrigatório.")
    .trim()
    .min(4, "Ano inválido."),
  modelYear: z.string("Ano modelo é obrigatório.")
    .trim()
    .min(4, "Ano modelo inválido."),
});

export const thirdFormSchema = z.object({
  origen: z.literal(String(CarOrigenEnum.THIRD)),
  name: z.string()
    .trim()
    .min(3, "O nome do vendedor é obrigatório."),
  cpfCnpj: z.string()
    .trim()
    .min(11, "CPF ou CNPJ do vendedor é obrigatório."),
  paymentDate: z.coerce.date<Date>(),
  paid: z.coerce.number<number>("O valor da transação é obrigatório.")
    .nonnegative('O valor não pode ser negativo.'),
  refPlate: z.string().optional(),
  notes: z.string().optional(),
});

export const auctionFormSchema = z.object({
  origen: z.literal(String(CarOrigenEnum.AUCTION)),
  code: z.string()
    .trim()
    .min(2, "Código do veículo obrigatório."),
  name: z.string(),
  consignor: z.string()
    .trim()
    .min(2, "Comitê do leilão é obrigatório."),
  functional: z.coerce.number<number>(),
  damageType: z.coerce.number<number>(),
  bid: z.coerce.number<number>("Pagamento obrigatório.")
    .nonnegative('O valor não pode ser negativo.'),
  commission: z.coerce.number<number>("Comissão obrigatório.")
    .nonnegative('O valor não pode ser negativo.'),
  administrative: z.coerce.number<number>()
    .nonnegative('O valor não pode ser negativo.')
    .default(0)
    .optional(),
  others: z.coerce.number<number>()
    .nonnegative('O valor não pode ser negativo.')
    .default(0)
    .optional(),
  totalPaid: z.coerce.number<number>()
    .default(0)
    .optional(),
})

export const paymentFormSchema = z.discriminatedUnion("origen", [
    auctionFormSchema,
    thirdFormSchema
]);