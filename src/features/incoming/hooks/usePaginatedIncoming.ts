

import { useDebounce } from "@/shared/hooks/useDebounce"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getPaginatedIncomingApi } from "../incoming.api"
import type { IncomingSortField } from "../incoming.model"



export const usePaginatedIncomings = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 10)
    const search = searchParams.get('search') || ''
    const sort = searchParams.get('sort') || 'created_at'
    const order = (searchParams.get('order') || 'desc') as 'asc' | 'desc'

    const [searchInput, setSearchInput] = useState<string>(search)

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


    useEffect(() => {
        updateParams({ search: debouncedSearch });
    }, [debouncedSearch, updateParams]);


    const query = useQuery({
        queryKey: [
            'incomings',
            page,
            limit,
            search,
            sort,
            order
        ],
        queryFn: () =>
            getPaginatedIncomingApi({
                page,
                limit,
                search,
                sort,
                order
            }),
        placeholderData: (prev) => prev,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        
    })


    const setPage = (newPage: number) => {
        updateParams({ page: newPage })
    }

    const setSort = (value: IncomingSortField, order: 'asc' | 'desc') => {
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

        page,
        limit,
        sort,
        order,

        searchInput,
        setSearchInput,

        setPage,
        setSort,
        toggleOrder,
        setOrder
    }


}