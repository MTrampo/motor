import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { VehicleFormatted } from "@/commons/models/Vehicle"
import { CarStatusBadge } from "@/components/status/car-status"
import { FaEye } from "react-icons/fa6"

export const columns: ColumnDef<VehicleFormatted>[] = [
  {
    accessorKey: "licensePlate",
    header: "Placa",
    cell: ({ row }) => <div className="uppercase">{row.getValue("licensePlate")}</div>,
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
    accessorKey: "paidFormatted",
    header: "Pagamento",
    cell: ({ row }) => <div className="font-medium">{row.getValue("paidFormatted")}</div>,
  },
  {
    accessorKey: "maintenance.totalFormatted",
    header: "Manutenção",
    cell: ({ row }) => <div className="font-medium">{row.original.maintenance.totalFormatted}</div>,
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