import { FaEllipsisVertical } from "react-icons/fa6";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { isAvailableForSale } from "@/commons/utils/status-sequences";
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