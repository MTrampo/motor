"use client"

import { useRef } from "react";
import Image from "next/image";
import svgCarRepair from "@/commons/assets/svgs/car-repair.svg";
import { VehicleFormatted } from "@/commons/models/Vehicle";
import { ButtonIcon } from "@/components/buttons/button-icon";
import { RegisterCostForm } from "@/components/forms/Cost/cost-form";
import { SheetForm, SheetFormRef } from "@/components/forms/sheet-form";
import { CarStatusBadge } from "@/components/status/car-status";
import { Button } from "@/components/ui/button";
import { ChartBarProfitProjection } from "@/components/vehicles/chart/chart-profit-projection-vehicle";
import TableCostsVehicle from "@/components/vehicles/data-table/table-costs-vehicle";
import { FaCartArrowDown, FaEllipsisVertical, FaFileCirclePlus, FaMagnifyingGlassDollar, FaMoneyBillTrendUp, FaPenToSquare, FaSackDollar, FaScrewdriverWrench } from "react-icons/fa6";
import { RegisterCostFormInputs } from "@/commons/models/Cost";
import { addCost } from "./action";
import { currencyFormatter } from "@/commons/utils/formatter";
import { ChartCostAnalysis } from "@/components/vehicles/chart/chart-cost-analysis";
import { useGetCostByPlateSWR } from '@/hooks/swr/use-cost'

type VehicleDetailsProps = {
  vehicle: VehicleFormatted
}

export default function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  const { mutate, cost, isLoading } = useGetCostByPlateSWR(vehicle.id)

  const formRef = useRef<SheetFormRef>(null)

  const handleAddCost = async (data: RegisterCostFormInputs[]) => {
    await addCost(vehicle.id, data)
    await mutate()
  }

  return (
    <main className="max-[374]:p-2 p-6 flex flex-col xl:flex-row xl:items-start gap-6">
      <div className="flex flex-col gap-6 w-full">
        <div className="w-full flex flex-col gap-10 border rounded-xl -mt-16 z-10 bg-white shadow-sm">
          <div className="flex flex-col max-[374]:p-5 p-10 gap-6">
            <div className="flex flex-col-reverse lg:flex-row lg:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold gap-1 flex items-center">
                  {vehicle.brand}
                  <span className="text-blue-500">{vehicle.model}</span>
                </h1>
                <h2 className="text-muted-foreground">
                  {vehicle?.version}
                </h2>
              </div>
              <div className="flex justify-between pb-6 lg:block lg:space-x-10">
                <CarStatusBadge status={vehicle.status}/>
                <ButtonIcon icon={<FaEllipsisVertical />} info="Ações" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <span className="block text-muted-foreground">Pagamento</span>
                <span className="block font-semibold">{vehicle.payment.paymentDateFormatted}</span>
              </div>
              <div>
                <span className="block text-muted-foreground">Ano</span>
                <span className="block font-semibold">{vehicle.manufacturingYear}/{vehicle.modelYear}</span>
              </div>
              <div>
                <span className="block text-muted-foreground">Km</span>
                <span className="block font-semibold">{vehicle.kilometers}</span>
              </div>
              <div>
                <span className="block text-muted-foreground">Cor</span>
                <span className="block font-semibold">{vehicle.color}</span>
              </div>
              <div>
                <span className="block text-muted-foreground">Condição</span>
                <span className="block font-semibold">{vehicle.conditionTypeFormatted}</span>
              </div>
              <div>
                <span className="block text-muted-foreground">Placa</span>
                <span className="block font-semibold">{vehicle.id}</span>
              </div>
              <div>
                <span className="block text-muted-foreground">Chassi</span>
                <span className="block font-semibold">{vehicle.chassis}</span>
              </div>
            </div>
          </div>
          {vehicle.payment.auction && (
            <div className="flex flex-col max-[374]:p-5 p-10 gap-6 border-t">
              <h3 className="text-muted-foreground text-xl font-semibold flex gap-1">
                Leilão
                <span className="block capitalize text-blue-500">{vehicle.payment.auction.name}</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                  <span className="block text-muted-foreground">Código</span>
                  <span className="block font-semibold">{vehicle.payment.auction.code}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Comitente</span>
                  <span className="block font-semibold">{vehicle.payment.auction.consignor}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Monta</span>
                  <span className="block font-semibold">{vehicle.payment.auction.damageTypeFormatted}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Condição</span>
                  <span className="block font-semibold">{vehicle.payment.auction.functionalFormatted}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Lance</span>
                  <span className="block font-semibold">{vehicle.payment.auction.bidFormatted}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Comissão</span>
                  <span className="block font-semibold">{vehicle.payment.auction.commissionFormatted}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Administração</span>
                  <span className="block font-semibold">{vehicle.payment.auction.administrativeFormatted}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Outros</span>
                  <span className="block font-semibold">{vehicle.payment.auction.othersFormatted}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-10 border rounded-xl bg-white shadow-sm">
          <div className="max-[374]:p-5 p-10">
            <div className="flex justify-between items-center">
              <h3 className="text-muted-foreground text-xl font-semibold flex gap-1">
                Custos
                <span className="block capitalize text-blue-500">Gerais</span>
              </h3>
              <div>
                <SheetForm
                  formRef={formRef}
                  triggerComponent={(
                    <Button variant="outline" size="icon">
                      <FaFileCirclePlus />
                    </Button>
                  )}
                  title="Adicionar Custos"
                  description='Informe qualquer despesa relacionada ao seu veículo, desde manutenções e reparos a gastos com peças, inspeções ou documentação.'
                  formComponent={(
                    <RegisterCostForm ref={formRef} onHandleSubmitCost={handleAddCost} />
                  )}
                />
              </div>
            </div>
            {cost ? (
              <TableCostsVehicle plate={vehicle.id} cost={cost}/>
            ) : (
              <div className="flex flex-col gap-5 pt-12">
                <Image src={svgCarRepair} className="mx-auto" alt="carro em manutenção" width={200} height={200}/>
                <div className="text-center text-muted-foreground">
                  <p>
                    Parece que o nosso mecânico está de folga!
                  </p>
                  <p>
                    Lance o primeiro gasto para dar a ele um motivo para entrar em ação
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <aside className="xl:w-3/5 max-[374]:p-5 p-10 border rounded-xl xl:-mt-16 xl:z-10 bg-white shadow-sm flex flex-col gap-6">
        {vehicle.fipe > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl md:text-2xl font-bold text-muted-foreground">
              Simulação de Lucro com Desconto FIPE
            </h2>
            <div className="grid grid-cols-2 gap-y-2 sm:grid-cols-3 md:gap-y-0">
              <div className="col-span-2 sm:col-span-1">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <FaMagnifyingGlassDollar />
                  Fipe
                </span>
                <span className="block font-semibold">{vehicle.fipeFormatted}</span>
              </div>
              <div>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <FaCartArrowDown />
                  Pago
                </span>
                <span className="block font-semibold">{vehicle.payment.totalFormatted}</span>
              </div>
              <div>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <FaSackDollar />
                  Gasto Total
                </span>
                <span className="block font-semibold">
                  {cost?.totalFormatted ?? 'R$ 0,00'}
                </span>
              </div>
            </div>
            <ChartBarProfitProjection vehicle={vehicle} cost={cost}/>
          </div>
        )}
        {cost && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl md:text-2xl font-bold text-muted-foreground">
              Análise de Gastos por Categoria
            </h2>
            <p>
              Entenda como o capital investido se distribuiu para as diferentes categorias de custos.
            </p>
            <ChartCostAnalysis cost={cost}/>
          </div>
        )}
      </aside>
    </main>
  )
}