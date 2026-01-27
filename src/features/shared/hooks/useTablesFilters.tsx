import { useState, useEffect, useCallback } from "react";
import { useDebouncedValue } from "@mantine/hooks";

interface FilterConfig<T extends Record<string, any> = Record<string, any>> {
  initialFilters: T;
  debounceFields?: (keyof T)[];
  debounceDelay?: number;
}

export const useTableFilters = <T extends Record<string, any>>({
  initialFilters,
  debounceFields = [],
  debounceDelay = 500,
}: FilterConfig<T>) => {
  // Filter states
  const [filters, setFilters] = useState<T>(initialFilters);

  // Pagination states
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });

  // Create debounced values for specified fields
  const debouncedValues: Record<string, any> = {};

  debounceFields.forEach((field) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [debouncedValue] = useDebouncedValue(
      filters[field as string],
      debounceDelay,
    );
    debouncedValues[field as string] = debouncedValue;
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [...Object.keys(filters).map((key) => filters[key]), pagination.pageSize]);

  // Update filter
  const updateFilter = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    console.log(value);

    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Update pagination
  const updatePagination = useCallback(
    (key: "page" | "pageSize", value: number) => {
      setPagination((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [initialFilters]);

  // Clear specific filter
  const clearFilter = useCallback(
    <K extends keyof T>(key: K) => {
      setFilters((prev) => ({ ...prev, [key]: initialFilters[key] }));
      setPagination((prev) => ({ ...prev, page: 1 }));
    },
    [initialFilters],
  );

  // Get query params with debounced values where applicable
  const getQueryParams = useCallback(() => {
    const params: Record<string, any> = {
      ...filters,
      ...pagination,
    };

    // Replace with debounced values
    debounceFields.forEach((field) => {
      if (debouncedValues[field as string] !== undefined) {
        params[field as string] = debouncedValues[field as string];
      }
    });

    // Remove null/undefined/empty values
    Object.keys(params).forEach((key) => {
      if (
        params[key] === null ||
        params[key] === undefined ||
        params[key] === ""
      ) {
        delete params[key];
      }
    });

    return params;
  }, [filters, pagination, debouncedValues]);

  return {
    // Filter state
    filters,
    debouncedValues,

    // Pagination state
    pagination,

    // Actions
    updateFilter,
    updatePagination,
    clearFilters,
    clearFilter,

    // Query params for API calls
    getQueryParams,
  };
};
