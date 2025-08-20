"use client"

import * as React from "react"
import { ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { columns } from "./columns-costs-vehicle"
import { FaFilter, FaFilterCircleXmark, FaMagnifyingGlass } from 'react-icons/fa6'
import { useMemo } from "react"
import { CostTypeText } from "../cost-type"
import { InputIcon } from "@/components/ui/input-icon"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CostFormatted } from "@/commons/models/Cost"

type TableCostsVehicleProps = {
  cost: CostFormatted
}

export default function TableCostsVehicle({ cost }: TableCostsVehicleProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: cost?.items || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), 
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5
      }
    }
  })

  const uniqueTypeValuesWithCount = useMemo(() => {
    if (!cost?.items || !Array.isArray(cost.items)) {
      return []
    }
    const counts = cost.items.reduce((acc, item) => {
      const key = item.type
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.keys(counts)
      .sort()
      .map(key => ({
        value: Number(key),
        count: counts[key]
      }));
  }, [cost?.items]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
          <InputIcon
            placeholder="Buscar pela descrição..."
            value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("description")?.setFilterValue(event.target.value)
            }
            iconLeft={<FaMagnifyingGlass/>}
          />
        
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <FaFilter /> Tipo
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {uniqueTypeValuesWithCount.map((item) => {
              const column = table.getColumn("type");
              const filterValue = (column?.getFilterValue() as number[]) || [];
              const isChecked = filterValue.includes(item.value);

              return (
                <DropdownMenuItem
                  key={item.value}
                  onSelect={(event) => {
                    event.preventDefault();
                    const newFilterValue = isChecked
                      ? filterValue.filter((v) => v !== item.value)
                      : [...filterValue, item.value];

                    if (newFilterValue.length === 0) {
                      column?.setFilterValue(undefined);
                    } else {
                      column?.setFilterValue(newFilterValue);
                    }
                  }}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 font-medium">
                    <Checkbox id={`checkbox-${item.value}`} checked={isChecked} />
                    <CostTypeText type={item.value} />
                  </div>
                  <span className="text-muted-foreground">{item.count}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {columnFilters.length > 0 && (
          <>
            <Button
              variant="outline"
              onClick={() => table.resetColumnFilters()}
            >
              <FaFilterCircleXmark />
              Remover Filtros
            </Button>
          </>
        )}
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:justify-between sm:space-x-2 py-4">
        <div className="text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getPaginationRowModel().rows.length} linha(s) selecionadas.
        </div>
        <div className="flex items-center gap-2 mt-5 sm:mt-0">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-normal text-muted-foreground">
              Linhas por página
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 35, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm text-muted-foreground">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </div>
        </div>
        <div className="mt-2 sm:mt-0 space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterio
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
