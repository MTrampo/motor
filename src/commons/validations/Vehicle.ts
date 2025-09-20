import z from 'zod'
import { CarOrigenEnum } from '../enums/Car';
import { isCnpjValid, isCpfValid } from '../utils/validations';

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
  kilometers: z.coerce.number<number>()
    .nonnegative('Quilometragem não pode ser negativa.')
    .default(0)
    .optional(),
  conditionType: z.coerce.number<number>("Condição é obrigatório."),
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
  cpfCnpj: z.string("CPF ou CNPJ do vendedor(a) é obrigatório.")
    .trim()
    .min(1, "CPF ou CNPJ inválido.")
    .refine((value) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length === 11) {
          return isCpfValid(numericValue);
        }
        if (numericValue.length === 14) {
          return isCnpjValid(numericValue);
        }
        // Retorna false se o tamanho não for 11 ou 14
        return false;
      },
      'CPF ou CNPJ inválido'
    ),
  paymentDate: z.coerce.date<Date>(),
  paid: z.coerce.number<number>("O valor da transação é obrigatório.")
    .nonnegative('O valor não pode ser negativo.'),
  notes: z.string().optional(),
});

export const auctionFormSchema = z.object({
  origin: z.literal(String(CarOrigenEnum.AUCTION)),
  code: z.string("Código do veículo obrigatório.")
    .trim(),
  name: z.string("Nome do leilão é obrigatório."),
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

export const vehicleDefaultValues = {
  licensePlate: '',
  color: '',
  brand: '',
  model: '',
  version: '',
  manufacturingYear: '',
  modelYear: '',
  kilometers: 0,
  conditionType: 0,
  chassis: '',
  fipe: 0
}

export const paymentDefaultValues = {
  origin: '3',
  name: '',

  // defaultValues third
  cpfCnpj: '',
  paid: 0,
  paymentDate: new Date(),
  refPlate: '',
  notes: '',
  // defaultValues auction
  code: '',
  consignor: '',
  functional: 0,
  damageType: 0,
  bid: 0,
  commission: 0,
  administrative: 0,
  others: 0,
  totalPaid: 0,
}

export const VEHICLE = "vehicle" as const
export const PAYMENT = "payment" as const
export const SUMMARY = "summary" as const