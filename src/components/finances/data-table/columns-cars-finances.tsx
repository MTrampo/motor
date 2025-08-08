import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { FaArrowRotateRight, FaArrowUpAZ, FaCarBurst } from "react-icons/fa6"


export type Payment = {
  id: string
  vehicle: string
  licensePlate: string
  payment: number
  status: string
  brand: string
  color: string
  maintenance: number
}

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "vehicle",
    header: "Veículo",
    cell: ({ row }) => <div className="uppercase">{row.getValue("vehicle")}</div>,
  },
  {
    accessorKey: "color",
    header: "Cor",
    cell: ({ row }) => <div className="uppercase">{row.getValue("color")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "Em Manutenção" ? (
          <FaCarBurst />
        ) : (
          <FaArrowRotateRight />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "payment",
    header: "Pgto",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("payment"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "maintenance",
    header: "Manut",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("maintenance"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
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

// (
//         <div
//           className="flex items-center"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Veículo
//           <div>
//             <FaArrowUpAZ />
//           </div>
//         </div>
//       )