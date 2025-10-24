import { useRef } from "react";
import { DialogForm, DialogFormRef } from "../forms/dialog-form";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { FaCashRegister } from "react-icons/fa6";
import { VehicleFormatted } from "@/commons/models/Vehicle";
import { GiF1Car, GiFullMotorcycleHelmet } from "react-icons/gi";
import { fullNameFormatter } from "@/commons/utils/formatter";
import { SellForm } from "../forms/Vehicle/sell-form";
import { useUser } from "@/hooks/use-user";
import { VehicleSellFormInputs } from "@/commons/models/Sale";
import { useSellVehicleSWR } from "@/hooks/swr/use-sale";

type SellVehicleActionProps = {
  vehicle: VehicleFormatted
  totalCost: number
}

export function SellVehicleAction({ vehicle, totalCost }: SellVehicleActionProps) {
  const { user } = useUser()
  const { sellVehicle } = useSellVehicleSWR()

  const sellFormRef = useRef<DialogFormRef>(null)

  const fullName = fullNameFormatter(`${vehicle.brand} ${vehicle.model}`.trim())

  const handleSellVehicle = async (data: VehicleSellFormInputs) => {
    const history = vehicle.status.history
    const lastDocumentId = history && history.length > 0 ? history[history.length - 1].id : null

    await sellVehicle(vehicle.id, data, vehicle.payment.total, totalCost, user!.id, lastDocumentId!)
  }

  return(
    <DialogForm
      formRef={sellFormRef}
      triggerComponent={(
        <DropdownMenuItem 
          className="cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          <FaCashRegister />
          Vender
        </DropdownMenuItem>
      )}
      title={(
        <>
          <GiFullMotorcycleHelmet /> Saída dos Boxes
        </>
      )}
      description={`A bandeira quadriculada está tremulando! Negócio fechado: o ${fullName} está pronto para acelerar nas mãos do seu novo piloto!`}
      formComponent={<SellForm ref={sellFormRef} onHandleSubmit={handleSellVehicle}/>}
      buttonText={(
        <>
          ACELERAR NA PISTA <GiF1Car className="!w-10 !h-10" />
        </>
      )}
    />
  )
}