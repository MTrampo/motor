import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  ColumnDef,
} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { VehicleFormatted } from "@/commons/models/Vehicle"
import { CarStatusBadge } from "@/components/status/car-status"

export const columns: ColumnDef<VehicleFormatted>[] = [
  {
    id: "select",
    accessorKey: "licensePlate",
    header: ({ table }) => (
      <div className="flex items-center gap-x-2">
        <Checkbox
          id="allLicensePlate"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar todos"
        />
        <Label htmlFor="allLicensePlate">Placa</Label>
      </div>
    ),
    cell: ({ row }) => { 
      const cell = row.original.licensePlate
      return (
        <div className="flex items-center gap-x-2">
          <Checkbox
            id={cell}
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Selecionar linha"
          />
          <Label htmlFor={cell} className="uppercase">{cell}</Label>
        </div>
      )
    },
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
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]