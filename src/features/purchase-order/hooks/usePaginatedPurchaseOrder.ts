import { useDebounce } from "@/shared/hooks/useDebounce"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getPaginatedPurchaseOrderApi } from "../purchaseOrder.api"
import type { PoSortField } from "../purchaseOrder.model"



export const usePaginatedPurchaseOrders = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // 🌐 READ FROM URL (source of truth)
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') || ''
  const supplier_name = searchParams.get('supplier_name') || ''
  const sort = searchParams.get('sort') || 'purchase_order_date'
  const order = searchParams.get('order') || 'desc'

  // local state (for typing only)
  const [searchInput, setSearchInput] = useState<string>(search)

  // debounce typing
  const debouncedSearch = useDebounce(searchInput, 500);


  const updateParams = useCallback((newParams: Record<string, string | number>) => {
      setSearchParams(prev => {
          const params = new URLSearchParams(prev);

          Object.entries(newParams).forEach(([key, value]) => {
              if (value === '' || value === null || value === undefined) {
                  params.delete(key)
              } else {
                  params.set(key, String(value))
              }
          });

          return params;
      });
  }, [setSearchParams]);



    // sync debounce 
  useEffect(() => {
      updateParams({ search: debouncedSearch });
  }, [debouncedSearch, updateParams]);


  //  query
  const query = useQuery({
    queryKey: [
      'purchase-orders',
      page,
      limit,
      status,
      supplier_name,
      search,
      sort,
      order
    ],
    queryFn: () =>
      getPaginatedPurchaseOrderApi({
        page,
        limit,
        status,
        supplier_name,
        search,
        sort,
        order
      }),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    
  })


 

  //  exposed helpers
  const setPage = (newPage: number) => {
    updateParams({ page: newPage })
  }

const setStatus = (value: string) => {

   const params = new URLSearchParams(searchParams);

    if (value.trim().toLowerCase() == 'all') {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    setSearchParams(params);
    
};

  const setSort = (value: PoSortField, order: 'asc' | 'desc') => {
    updateParams({ sort: value, order })
  }

  const setOrder = (value: 'asc' | 'desc') => {
    updateParams({ order: value })
  }

  const toggleOrder = () => {
    updateParams({ order: order === 'asc' ? 'desc' : 'asc' })
  }

  return {
    ...query,

    // data
    page,
    limit,
    status,
    supplier_name,
    sort,
    order,

    // UI state
    searchInput,
    setSearchInput,

    // actions
    setPage,
    setStatus,
    setSort,
    toggleOrder,
    setOrder
  }


}