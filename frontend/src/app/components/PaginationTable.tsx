import { Table } from "@tanstack/react-table";
import Button from "./Button";

interface PaginationTableProps<T> {
  table: Table<T>;
}

export const PaginationTable = <T,>({ table }: PaginationTableProps<T>) => {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getPrePaginationRowModel().rows.length;

  const lastEntryIndex = Math.min((pageIndex + 1) * pageSize, totalRows);

  const shouldShowPagination = table.getPageCount() > 1;

  if (!shouldShowPagination) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
      <div className="flex-1 text-sm text-gray-700">
        Affichage de {lastEntryIndex} sur {totalRows} entrées
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Précédent
        </Button>
        <span className="text-sm">
          Page {pageIndex + 1} sur {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
};
