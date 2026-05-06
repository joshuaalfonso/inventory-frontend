

import { useDebounce } from "@/shared/hooks/useDebounce"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import {  useEffect, useMemo, useState } from "react"
import { getPaginatedIncomingApi } from "../incoming.api"
import type { IncomingSortField } from "../incoming.model"
import { useIncomingParams } from "./useIncomingParams"



export const usePaginatedIncomings = () => {

     const queryClient = useQueryClient();

    const {
        page,
        limit,
        search,
        sort,
        order,
        updateParams,
    } = useIncomingParams();

    const [searchInput, setSearchInput] = useState(search);

    const debouncedSearch = useDebounce(searchInput, 500);

    useEffect(() => {
        if (debouncedSearch !== search) {
            updateParams({
                search: debouncedSearch,
                page: 1, 
            });
        }
    }, [debouncedSearch, search, updateParams]);

    useEffect(() => {
        setSearchInput(search);
    }, [search]);

    const queryKey = useMemo(() => [
        "incomings",
        page,
        limit,
        search,
        sort,
        order,
    ], [page, limit, search, sort, order]);

    const query = useQuery({
        queryKey,
        queryFn: () =>
            getPaginatedIncomingApi({
                page,
                limit,
                search,
                sort,
                order,
            }),
        placeholderData: (prev) => prev,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });

    useEffect(() => {
        const data = query.data;
        if (!data) return;

        const totalPages = data.totalPages;

        if (page >= totalPages) return;

        const nextPage = page + 1;

        if (nextPage < 1) return;

        if (nextPage < 1 || nextPage > totalPages) return;

        queryClient.prefetchQuery({
            queryKey: [
                "incomings",
                nextPage,
                limit,
                search,
                sort,
                order,
            ],
            queryFn: () =>
                getPaginatedIncomingApi({
                    page: nextPage,
                    limit,
                    search,
                    sort,
                    order,
                }),
            staleTime: 1000 * 60 * 5,
        });

    }, [
        page,
        limit,
        search,
        sort,
        order,
        query.data,
        queryClient,
    ]);

    const setPage = (newPage: number) => {
        updateParams({ page: newPage });
    };

    const setSort = (value: IncomingSortField, order: "asc" | "desc") => {
        updateParams({ page: 1, sort: value, order });
    };

    const toggleOrder = () => {
        updateParams({
            order: order === "asc" ? "desc" : "asc",
        });
    };

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
    };

};
