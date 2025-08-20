// 'use client'

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from '@hookform/resolvers/zod'
// import { FaArrowLeftLong, FaArrowUp19, FaCartPlus, FaCircleCheck, FaCircleDollarToSlot, FaSackDollar, FaTrashCan } from "react-icons/fa6";
// import { BudgetFormInputs } from "@/commons/models/Budget"; 
// import { budgetFormSchema } from "@/commons/validations/Budget";
// import { Input } from "../../ui/input";
// import { Button } from "../../ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
// import { Separator } from "../../ui/separator";
// import { AccordionService } from "@/commons/components/accordions/Service";
// import { Accordion } from "../../ui/accordion";
// import { formatCurrencyInput, normalizeCurrencyValue, valueFormatter } from "@/commons/utils/formatter";


// type EditBudgetFormProps = {
//   items: BudgetFormInputs[]
//   onHandleSubmitBudget: (data: BudgetFormInputs[]) => void
// }

// export function EditBudgetForm({ items, onHandleSubmitBudget }: EditBudgetFormProps) {
//   const [budgets, setBudgets] = useState<BudgetFormInputs[]>(items)

//   const formBudget = useForm<BudgetFormInputs>({
//     resolver: zodResolver(budgetFormSchema),
//     defaultValues: {
//       description: '',
//       price: 0,
//       amount: ''
//     }
//   })

//   const handleAddBudget = (data: BudgetFormInputs) => {
//     setBudgets((budget) => [...budget, data]);
//     formBudget.reset()
//   }

//   const handleRemoveBudget = (index: number) => {
//     setBudgets((budget) => budget.filter((_, i) => i !== index))
//   }

//   return(
//     <Form {...formBudget}>
//       <form className="space-y-3" onSubmit={formBudget.handleSubmit(handleAddBudget)}>
//         <FormField
//           name="description"
//           control={formBudget.control}
//           rules={{ required: true }}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Descrição</FormLabel>
//               <FormControl>
//                 <Input type="text" placeholder="Ex: Lavagem simples" {...field}/>
//               </FormControl>
//               <FormMessage/>
//             </FormItem>
//           )}
//         />
//         <FormField
//           name="amount"
//           control={formBudget.control}
//           rules={{ required: true }}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Quantidade</FormLabel>
//               <FormControl>
//                 <Input type="tel" placeholder="Ex: 2" {...field}/>
//               </FormControl>
//               <FormMessage/>
//             </FormItem>
//           )}
//         />
//         <FormField
//           name="price"
//           control={formBudget.control}
//           rules={{ required: true }}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Preço</FormLabel>
//               <FormControl>
//                 <Input 
//                   inputMode="numeric" 
//                   type="tel" 
//                   placeholder="Ex: 130"  
//                   {...field}
//                   value={formatCurrencyInput(field.value ?? 0)}
//                   onChange={(e) => {
//                     const floatValue = normalizeCurrencyValue(e.target.value)
//                     field.onChange(floatValue)
//                   }}
//                 />
//               </FormControl>
//               <FormMessage/>
//             </FormItem>
//           )}
//         />

//         <Button className="w-full gap-x-2 mt-3" type="submit">
//           ADICIONAR ITEM <FaCartPlus  className="h-4 w-4"/>
//         </Button>
//       </form>

//       {budgets.length > 0 && (
//         <div className="space-y-5">
//           <Separator className="my-5"/>

//           <Accordion type="single" collapsible className="w-full space-y-3">
//             {budgets.map((item, i) => (
//               <AccordionService.Root key={i} value={item.description}>
//                 <AccordionService.Header>{item.description}</AccordionService.Header>
//                 <AccordionService.Body>
//                   <div className="font-bold">
//                     <div className="flex justify-center space-x-1 items-center">
//                       <FaArrowUp19/>
//                       <span>Qtd</span>
//                     </div>
//                     <span className="block text-gray-500 text-center">{item.amount}</span>
//                   </div>
//                   <div className="font-bold">
//                     <div className="flex justify-center space-x-1 items-center">
//                       <FaCircleDollarToSlot/>
//                       <span>Preço</span>
//                     </div>
//                     <span className="block text-gray-500 text-center">{valueFormatter.format(item.price)}</span>
//                   </div>
//                 </AccordionService.Body>
//                 <AccordionService.Footer>
//                   <Button variant='destructive' className="w-full gap-2" onClick={() => handleRemoveBudget(i)}>
//                     EXCLUIR ITEM <FaTrashCan className="h-4 w-4"/>
//                   </Button>
//                 </AccordionService.Footer>
//               </AccordionService.Root>
//             ))}
//           </Accordion>

//           <Button variant='success' className="w-full gap-2" onClick={() => onHandleSubmitBudget(budgets)}>
//             FINALIZAR ORÇAMENTO <FaCircleCheck className="h-4 w-4"/>
//           </Button>
//         </div>
//       )}
//     </Form>
//   )
// }