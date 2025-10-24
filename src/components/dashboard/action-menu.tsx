import { FaCashRegister, FaEllipsisVertical, FaX } from "react-icons/fa6";
import { ButtonIcon } from "../buttons/button-icon";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { GiCargoCrane, GiGearStickPattern } from "react-icons/gi";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { StatusForm } from "../forms/Vehicle/status-form";
import { isAvailableForSale } from "@/commons/utils/status-sequences";
import { CarStatusEnum } from "@/commons/enums/Car";
import { SellVehicleAction } from "./sell-vehicle-action";
import { VehicleFormatted } from "@/commons/models/Vehicle";


type ActionMenuProps = {
  vehicle: VehicleFormatted
  totalCost: number
}

export function ActionMenu({ vehicle, totalCost }: ActionMenuProps) {
  const availableSell = isAvailableForSale(vehicle.status.current)
  
  return(
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <FaEllipsisVertical/>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          Ações
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-56" align="start">
        {availableSell && (
          <SellVehicleAction vehicle={vehicle} totalCost={totalCost} />
        )}
        {/* <DropdownMenuItem className="cursor-pointer" variant='destructive'>
          <GiCargoCrane />
          Destruir Veículo
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}