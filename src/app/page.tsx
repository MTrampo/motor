import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import expenses from "@/commons/data/expenses.json"
import auctioned from "@/commons/data/auctioned.json"

export default function Home() {
  const total = expenses.reduce((a, c) => a + c.valor, 0)
  return (
    <main className="mx-auto px-6 py-12 sm:py-24 max-w-5xl md:max-w-7xl">
      <h2>Arrematado</h2>
      <Table>
        <TableCaption>CARROS ARREMATADOS</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Placa</TableHead>
            <TableHead>Cor</TableHead>
            <TableHead>Ano/Modelo</TableHead>
            <TableHead>Ano/Fabric</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Condição</TableHead>
            <TableHead>Fipe</TableHead>
            <TableCell>Pagamento</TableCell>
            <TableHead className="text-right">Pago</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auctioned.map(item => (
            <TableRow key={item.codigo}>
              <TableCell className="font-medium">{item.codigo}</TableCell>
              <TableCell>{item.marca}</TableCell>
              <TableCell>{item.modelo}</TableCell>
              <TableCell>{item.final_de_placa}</TableCell>
              <TableCell>{item.cor}</TableCell>
              <TableCell>{item.ano_modelo}</TableCell>
              <TableCell>{item.ano_de_fabricacao}</TableCell>
              <TableCell>{item.condicao}</TableCell>
              <TableCell>{item.condicao_de_func}</TableCell>
              <TableCell>{item.valor_fipe}</TableCell>
              <TableCell>{item.data_pagamento}</TableCell>
              <TableCell className="text-right">{item.valor_pago}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="mt-10">Despesas</h2>
      <Table>
        <TableCaption className="uppercase">Lista de despesas recentes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Código</TableHead>
            <TableHead>Versão</TableHead>
            <TableHead>Cor</TableHead>
            <TableHead>Gasto</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.descricao}>
              <TableCell className="font-medium">{expense.codigo}</TableCell>
              <TableCell>{expense.versao}</TableCell>
              <TableCell>{expense.cor}</TableCell>
              <TableCell>{expense.descricao}</TableCell>
              <TableCell className="text-right">{expense.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
}
