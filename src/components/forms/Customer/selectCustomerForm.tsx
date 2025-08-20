// "use client"

// import { Dispatch, SetStateAction, useState } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Check, ChevronsUpDown } from "lucide-react"
// import { useForm } from "react-hook-form"
// import { cn } from "@/commons/lib/utils"
// import { Button } from "../../ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../ui/command"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
// import { CustomerFormatted, SelectCustomerFormInputs } from "@/commons/models/Customer"
// import { selectCustomerFormSchema } from "@/commons/validations/Customer"
// import { FaUserCheck, FaUserPlus } from "react-icons/fa6"
// import { DocumentReference } from "firebase/firestore"

// type SelectCustomerFormProps = {
//   customers: CustomerFormatted[]
//   selected: SelectCustomerFormInputs
//   setRegister: Dispatch<SetStateAction<boolean>>
//   onHandleSubmitCustomer: (data: SelectCustomerFormInputs) => void
// }

// export function SelectCustomerForm({ customers, selected, setRegister, onHandleSubmitCustomer }: SelectCustomerFormProps) {
//   const [open, setOpen] = useState(false)
  
//   const formCustomer = useForm<SelectCustomerFormInputs>({
//     resolver: zodResolver(selectCustomerFormSchema),
//     defaultValues: {
//       id: selected.id,
//       name: selected.name
//     }
//   })

//   return (
//     <Form {...formCustomer}>
//       <form onSubmit={formCustomer.handleSubmit(onHandleSubmitCustomer)} className="space-y-3">
//         <FormField
//           name="name"
//           control={formCustomer.control}
//           rules={{ required: true }}
//           render={({ field }) => (
//             <FormItem className="flex flex-col">
//               <FormLabel>Cliente</FormLabel>
//               <Popover open={open} onOpenChange={setOpen}>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button
//                       variant="outline"
//                       role="combobox"
//                       className={cn(
//                         "justify-between",
//                         !field.value && "text-muted-foreground"
//                       )}
//                     >
//                       {field.value
//                         ? customers.find(
//                             (customer) => customer.name === field.value
//                           )?.name
//                         : "Selecionar cliente"}
//                       <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-[250px] p-0">
//                   <Command>
//                     <CommandInput placeholder="Procurar cliente..." />
//                     <CommandList>
//                       <CommandEmpty>Cliente não encontrado.</CommandEmpty>
//                       <CommandGroup>
//                         {customers.map((customer) => (
//                           <CommandItem
//                             className="capitalize"
//                             value={customer.name}
//                             key={customer.id}
//                             onSelect={() => {
//                               formCustomer.setValue("id", customer.id)
//                               formCustomer.setValue("name", customer.name)
//                               setOpen(false)
//                             }}
//                           >
//                             {customer.name}
//                             <Check
//                               className={cn(
//                                 "ml-auto",
//                                 customer.name === field.value
//                                   ? "opacity-100"
//                                   : "opacity-0"
//                               )}
//                             />
//                           </CommandItem>
//                         ))}
//                       </CommandGroup>
//                     </CommandList>
//                   </Command>
//                 </PopoverContent>
//               </Popover>
//               <FormDescription>
//                 Selecione ou cadastre um cliente para seguir com o orçamento.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div className="flex gap-2">
//           <Button className="p-5" variant="outline" size="icon" onClick={() => setRegister(register => !register)}>
//             <FaUserPlus className="h-5 w-5 shrink-0"/>
//           </Button>
//           <Button className="w-full gap-x-2" type="submit">
//             SELECIONAR <FaUserCheck className="h-4 w-4"/>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   )
// }
