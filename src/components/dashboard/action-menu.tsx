// import { FaEllipsisVertical, FaX } from "react-icons/fa6";
// import { ButtonIcon } from "../buttons/button-icon";
// import { Button } from "../ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
// import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
// import { GiCargoCrane, GiGearStickPattern } from "react-icons/gi";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
// import { StatusForm } from "../forms/Vehicle/status-form";
// import { getNextVehicleStatuses } from "@/commons/utils/status-sequences";
// import { CarStatusEnum } from "@/commons/enums/Car";

// type ActionMenuProps = {
//   currentStatus: CarStatusEnum
// }

// export function ActionMenu({ currentStatus }: ActionMenuProps) {
//   const statusList = getNextVehicleStatuses(currentStatus)

//   return(
//     <Dialog>
//       <DropdownMenu>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline">
//                 <FaEllipsisVertical/>
//               </Button>
//             </DropdownMenuTrigger>
//           </TooltipTrigger>
//           <TooltipContent>
//             Ações
//           </TooltipContent>
//         </Tooltip>
//         <DropdownMenuContent className="w-56" align="start">
//           {currentStatus !== CarStatusEnum.SOLD && (
//             <>
//               <DialogTrigger asChild>
//                 <DropdownMenuItem className="cursor-pointer">
//                   <GiGearStickPattern /> Mudar Marcha
//                 </DropdownMenuItem>
//               </DialogTrigger>
//               <DropdownMenuSeparator />
//             </>
//           )}
//           <DropdownMenuItem className="cursor-pointer" variant='destructive'>
//             <GiCargoCrane />
//             Destruir Carro
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//       <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
//         <DialogHeader>
//           <DialogTitle className="flex gap-2 items-center">
//             <GiGearStickPattern /> Mudar Marcha
//           </DialogTitle>
//           <DialogDescription>
//             Cada marcha representa uma etapa da jornada do seu veículo, do pátio à venda ou aluguel.
//             Mude a marcha para acompanhar o processo e manter tudo atualizado.
//           </DialogDescription>
//         </DialogHeader>
//         <div>
//           <StatusForm currentStatus={currentStatus} statusList={statusList} />
//         </div>
//         {/* <DialogFooter>
//           <DialogCancel>{cancelText}</DialogCancel>
//           <DialogAction
//             className={cn(actionButtonVariants({ variant: confirmButtonVariant }))}
//             onClick={onConfirm}
//           >
//             {confirmText}
//           </DialogAction>
//         </DialogFooter> */}
//       </DialogContent>
//     </Dialog>
//   )
// }