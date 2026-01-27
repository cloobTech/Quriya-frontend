import React from 'react';
import { Pagination, Select} from '@mantine/core';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
  isLoading?: boolean;
  className?: string;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30, 40, 50],
  isLoading = false,
  className = '',
}) => {
  return (
    <div className={`items-center justify-between flex mt-4 p-4 relative ${className}`}>
      <p className="text-xs font-semibold">
        {`Total: ${totalItems || 'NA'}`}
      </p>
      
      <Pagination
        total={totalPages || 1}
        value={currentPage}
        onChange={onPageChange}
        variant="light"
        radius="md"
        size="sm"
        disabled={isLoading}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      
      <div className="flex items-center gap-2">
        <p className="text-xs font-semibold">show per page: </p>
        <Select
          data={pageSizeOptions.map((size) => ({
            value: size.toString(),
            label: size.toString(),
          }))}
          value={pageSize.toString()}
          onChange={(value) => value && onPageSizeChange(Number(value))}
          className="w-18"
          size="xs"
          allowDeselect={false}
          searchable={false}
          clearable={false}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};