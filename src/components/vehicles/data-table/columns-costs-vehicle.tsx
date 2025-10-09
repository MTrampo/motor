"use client"

import { ColumnDef, Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ItemsCostFormatted } from "@/commons/models/Cost"
import { CostTypeBadge } from "../cost-type"
import { FaTrash } from "react-icons/fa6"
import { ActionDialog } from "@/components/dialogs/action-dialog"
import useCostSWR from "@/hooks/swr/use-cost"

type ActionsCellProps = {
  plate: string
  row: Row<ItemsCostFormatted>
}

const ActionsCell = ({ plate, row }: ActionsCellProps) => {
  const { killCost } = useCostSWR(plate);

  const handleDeletionCost = async () => {
    await killCost(plate, row.original.guid)
  }

  return (
    <ActionDialog
      title="Excluir Custo"
      description={
        <p>
          Você tem certeza que deseja excluir este custo:{' '}
          <b className="text-destructive">{row.original.description}</b>? 🤨
        </p>
      }
      confirmText="Excluir"
      cancelText="Cancelar"
      onConfirm={handleDeletionCost}
      confirmButtonVariant="destructive"
      triggerComponent={
        <Button className="cursor-pointer" variant="destructive" size="icon">
          <FaTrash/>
        </Button>
      }
    />
  )
}

export const getColumns = (plate: string): ColumnDef<ItemsCostFormatted>[] => {
  return [
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ row }) => <div className="capitalize">{row.getValue("description")}</div>,
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => <CostTypeBadge type={row.original.type} />,
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
      enableColumnFilter: true,
    },
    {
      accessorKey: "valueFormatted",
      header: "Valor",
      cell: ({ row }) => <div>{row.getValue("valueFormatted")}</div>,
    },
    {
      accessorKey: "paymentDateFormatted",
      header: "Pagamento",
      cell: ({ row }) => <div>{row.getValue("paymentDateFormatted")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <ActionsCell plate={plate} row={row}/>
    }
  ]
}