import { useDebounce } from "@/shared/hooks/useDebounce"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
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

  // 🧠 LOCAL STATE (for typing only)
  const [searchInput, setSearchInput] = useState(search)

  // 🔁 debounce typing
  const debouncedSearch = useDebounce(searchInput, 500)

  // 🔄 sync debounce → URL
  useEffect(() => {
    updateParams({ search: debouncedSearch, page: page })
  }, [debouncedSearch])

  // 🔧 helper to update URL params
  const updateParams = (newParams: Record<string, any>) => {
    const params = new URLSearchParams(searchParams)

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        params.delete(key)
      } else {
        params.set(key, String(value))
      }
    })

    setSearchParams(params)
  }

  // 🚀 query
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
    placeholderData: (prev) => prev
    // keepPreviousData: true
  })

  // 🎯 exposed helpers
  const setPage = (newPage: number) => {
    updateParams({ page: newPage })
  }

  const setStatus = (value: string) => {
    updateParams({ status: value, page: 1 })
  }

  const setSort = (value: PoSortField) => {
    updateParams({ sort: value })
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
    toggleOrder
  }
}