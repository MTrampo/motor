import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { VehicleSummaryFormatted } from "@/commons/models/Vehicle"
import { CarStatusBadge } from "@/components/status/car-status"
import { FaEye } from "react-icons/fa6"

export const columns: ColumnDef<VehicleSummaryFormatted>[] = [
  {
    accessorKey: "id",
    header: "Placa",
    cell: ({ row }) => <div className="uppercase">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "brand",
    header: "Marca",
    cell: ({ row }) => <div className="uppercase">{row.getValue("brand")}</div>,
  },
  {
    accessorKey: "version",
    header: "Veículo",
    cell: ({ row }) => <div className="uppercase">{row.getValue("version")}</div>,
  },
  {
    accessorKey: "color",
    header: "Cor",
    cell: ({ row }) => <div className="uppercase">{row.getValue("color")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <CarStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "totalPaidFormatted",
    header: "Pagamento",
    cell: ({ row }) => <div className="font-medium">{row.getValue("totalPaidFormatted")}</div>,
  },
  {
    accessorKey: "totalCostFormatted",
    header: "Custos",
    cell: ({ row }) => <div className="font-medium">{row.getValue("totalCostFormatted")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter()

      return (
        <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => router.push(`/dashboard/vehicles/${row.original.id}`)}>
          <FaEye/>
        </Button>
      )
    },
  },
]