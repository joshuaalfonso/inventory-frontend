

import { useDebounce } from "@/shared/hooks/useDebounce"
import { useQuery } from "@tanstack/react-query"
import {  useEffect, useState } from "react"
import { getPaginatedIncomingApi } from "../incoming.api"
import type { IncomingSortField } from "../incoming.model"
import { useIncomingParams } from "./useIncomingParams"



export const usePaginatedIncomings = () => {

    const {
        page,
        limit,
        search,
        sort,
        order,
        updateParams,
    } = useIncomingParams();

    const [searchInput, setSearchInput] = useState<string>(search);

    const debouncedSearch = useDebounce(searchInput, 500);

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
        updateParams({ page: 1, sort: value, order })
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

// useEffect(() => {
//         if (!query.data?.data) return;

//         window.scrollTo({ top: 0, behavior: 'smooth' });

//         if (query.data.page < query.data.totalPages) {
//             queryClient.prefetchQuery({
//                 queryKey: [
//                     'incomings',
//                     page + 1,
//                     limit,
//                     search,
//                     sort,
//                     order
//                 ],
//                 queryFn: () => 
//                     getPaginatedIncomingApi({
//                         page,
//                         limit,
//                         search,
//                         sort,
//                         order
//                     }),
//                 staleTime: 1000 * 60 * 5,
//                 gcTime: 1000 * 60 * 10,
//             });
//         }

//         if (page > 1) {
//             queryClient.prefetchQuery({
//                 queryKey: [
//                     'incomings',
//                     page - 1,
//                     limit,
//                     search,
//                     sort,
//                     order
//                 ],
//                 queryFn: () => 
//                     getPaginatedIncomingApi({
//                         page,
//                         limit,
//                         search,
//                         sort,
//                         order
//                     }),
//                 staleTime: 1000 * 60 * 5,
//                 gcTime: 1000 * 60 * 10,
//             });
//         }
//     }, [page, limit, search, sort, order, queryClient, query.data]);