export interface ProfitCalculation {
  paidValue: number;
  fipeValue: number;
  totalCosts: number;
}

export interface PaginatedResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}