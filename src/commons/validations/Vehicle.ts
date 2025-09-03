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
  kilometers: z.string().optional(),
  conditionType: z.coerce.number<number>("Condição é obrigatório.")
    .default(0)
    .optional(),
  chassis: z.string().min(17, "Chassi inválido").optional(),
  fipe: z.coerce.number<number>()
    .default(0)
    .optional(),
});

export const thirdFormSchema = z.object({
  origin: z.literal(String(CarOrigenEnum.THIRD)),
  name: z.string()
    .trim()
    .min(3, "O nome do vendedor é obrigatório."),
  cpfCnpj: z.string("CPF ou CNPJ do vendedor é obrigatório.")
    .trim()
    .min(11, "CPF ou CNPJ inválido."),
  paymentDate: z.coerce.date<Date>(),
  paid: z.coerce.number<number>("O valor da transação é obrigatório.")
    .nonnegative('O valor não pode ser negativo.'),
  notes: z.string().optional(),
});

export const auctionFormSchema = z.object({
  origin: z.literal(String(CarOrigenEnum.AUCTION)),
  code: z.string("Código do veículo obrigatório.")
    .trim(),
  auctionName: z.string("Nome do leilão é obrigatório."),
  consignor: z.string("Comitê do leilão é obrigatório.")
    .trim(),
  functional: z.coerce.number<number>("Condição do veículo é obrigatório."),
  damageType: z.coerce.number<number>("Tipo de monta é obrigatório."),
  bid: z.coerce.number<number>("Valor do lance obrigatório.")
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
  totalPaid: z.coerce.number<number>("Pagamento total obrigatório."),
  paymentDate: z.coerce.date<Date>("Data de pagamento obrigatória."),
  notes: z.string().optional(),
})

export const paymentFormSchema = z.discriminatedUnion("origin", [
  thirdFormSchema,
  auctionFormSchema,
]);

export const vehicleMainFormSchema = vehicleFormSchema.and(paymentFormSchema);