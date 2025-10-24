"use client"

import { CarOrigenEnum } from "@/commons/enums/Car"
import { VehicleAuctionFormInputs, VehicleMainFormInputs, VehicleThirdFormInputs } from "@/commons/models/Vehicle"
import { translateEnum } from "@/commons/utils/enum-helpers"
import { currencyFormatter, dateFormatter, formatNumber, formatCpfCnpj } from "@/commons/utils/formatter"

type SummaryFormProps = {
  summary: VehicleMainFormInputs | null
}

export function SummaryForm({ summary }: SummaryFormProps) {
  if (!summary) {
    return <div className="text-center text-gray-500">Nenhum dado para exibir.</div>;
  }

  function isAuction(summary: VehicleMainFormInputs): summary is VehicleAuctionFormInputs {
    return summary.origin === String(CarOrigenEnum.AUCTION);
  }

  function isThird(summary: VehicleMainFormInputs): summary is VehicleThirdFormInputs {
    return summary.origin === String(CarOrigenEnum.THIRD);
  }

  const origin = translateEnum("OriginType",  Number(summary.origin))
  const fipe = summary.fipe !== undefined ? currencyFormatter.format(summary.fipe) : '-'
  const kilometers = summary.kilometers !== undefined ? formatNumber.format(Number(summary.kilometers)) : '-'
  const condition = summary.conditionType !== undefined ? translateEnum('CarConditionType', summary.conditionType) : '-'
  const damage = isAuction(summary) && summary.damageType !== undefined ? translateEnum('DamageType', summary.damageType) : '-'
  const functional = isAuction(summary) && summary.functional !== undefined ? translateEnum('AuctionType', summary.functional) : '-'

  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-muted-foreground text-xl font-semibold flex flex-wrap gap-1">
        Informações do{' '}
        <span className="block capitalize text-blue-500">Veículo</span>
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div>
          <span className="block text-muted-foreground">Marca</span>
          <span className="block font-semibold">{summary.brand}</span>
        </div>
        <div>
          <span className="block text-muted-foreground">Modelo</span>
          <span className="block font-semibold">{summary.model}</span>
        </div>
        <div>
          <span className="block text-muted-foreground">Versão</span>
          <span className="block font-semibold">{summary.version || '-'}</span>
        </div>
        <div>
          <span className="block text-muted-foreground">Placa</span>
          <span className="block font-semibold">{summary.licensePlate}</span>
        </div>
        <div>
          <span className="block text-muted-foreground">Chassi</span>
          <span className="block font-semibold">{summary.chassis}</span>
        </div>
        <div>
          <span className="block text-muted-foreground">Cor</span>
          <span className="block font-semibold">{summary.color}</span>
        </div>
        <div>
          <span className="block text-muted-foreground">Condição</span>
          <span className="block font-semibold">{condition}</span>
        </div>
        <div>
          <span className="block text-muted-foreground">Km</span>
          <span className="block font-semibold">{kilometers}</span>
        </div>
        <div>
          <span className="block text-muted-foreground">Ano</span>
          <span className="block font-semibold">{summary.manufacturingYear}/{summary.modelYear}</span>
        </div>
        <div>
          <span className="block text-muted-foreground">Fipe</span>
          <span className="block font-semibold">{fipe}</span>
        </div>
      </div>
      <div>
        <h3 className="text-muted-foreground text-xl font-semibold flex flex-wrap gap-1">
          Informações de{' '}
          <span className="block text-blue-500">Pagamento</span>
        </h3>
        <p className="text-muted-foreground">{origin}</p>
      </div>
      {isThird(summary) && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div>
            <span className="block text-muted-foreground">Nome</span>
            <span className="block font-semibold">{summary.name}</span>
          </div>
          <div>
            <span className="block text-muted-foreground">CPF/CNPJ</span>
            <span className="block font-semibold">{formatCpfCnpj(summary.cpfCnpj)}</span>
          </div>
          <div>
            <span className="block text-muted-foreground">Data de Pagamento</span>
            <span className="block font-semibold">{dateFormatter.format(new Date(summary.paymentDate))}</span>
          </div>
          <div>
            <span className="block text-muted-foreground">Valor pago</span>
            <span className="block font-semibold">{currencyFormatter.format(summary.paid)}</span>
          </div>
          {summary.notes && (
            <div className="col-span-5">
              <span className="block text-muted-foreground">Observações</span>
              <span className="block font-semibold">{summary.notes}</span>
            </div>
          )}
        </div>
      )}
      {isAuction(summary) && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div>
            <span className="block text-muted-foreground">Nome do Leilão</span>
            <span className="block font-semibold">{summary.name}</span>
          </div>
          <div>
            <span className="block text-muted-foreground">Código</span>
            <span className="block font-semibold">{summary.code}</span>
          </div>
          <div>
            <span className="block text-muted-foreground">Comitê</span>
            <span className="block font-semibold">{summary.consignor}</span>
          </div>
          <div>
            <span className="block text-muted-foreground">Lance</span>
            <span className="block font-semibold">{currencyFormatter.format(summary.bid)}</span>
          </div>
          <div>
            <span className="block text-muted-foreground">Comissão</span>
            <span className="block font-semibold">{currencyFormatter.format(summary.commission)}</span>
          </div>
          <div>
            <span className="block text-muted-foreground">Total Pago</span>
            <span className="block font-semibold">{currencyFormatter.format(summary.totalPaid)}</span>
          </div>
          <div>
            <span className="block text-muted-foreground">Data de Pagamento</span>
            <span className="block font-semibold">{dateFormatter.format(new Date(summary.paymentDate))}</span>
          </div>
          <div>
            <span className="block text-muted-foreground">Tipo de Dano</span>
            <span className="block font-semibold">{damage}</span>
          </div>
          <div>
            <span className="block text-muted-foreground">Funcional</span>
            <span className="block font-semibold">{functional}</span>
          </div>
          <div>
            <span className="block text-muted-foreground">Outros</span>
            <span className="block font-semibold">{currencyFormatter.format(summary.others ?? 0)}</span>
          </div>
          <div>
            <span className="block text-muted-foreground">Administrativo</span>
            <span className="block font-semibold">{currencyFormatter.format(summary.administrative ?? 0)}</span>
          </div>
          {summary.notes && (
            <div className="col-span-full">
              <span className="block text-muted-foreground">Observações</span>
              <span className="block font-semibold">{summary.notes}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}