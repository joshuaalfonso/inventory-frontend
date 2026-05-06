import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

type Params = {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
    order?: "asc" | "desc";
};

export const useIncomingParams = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const params = useMemo(() => {
        return {
            page: Number(searchParams.get("page") || 1),
            limit: Number(searchParams.get("limit") || 10),
            search: searchParams.get("search") || "",
            sort: searchParams.get("sort") || "created_at",
            order: (searchParams.get("order") || "desc") as "asc" | "desc",
        };
    }, [searchParams]);

    const updateParams = useCallback((newParams: Params) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);

            for (const [key, value] of Object.entries(newParams)) {
                if (
                    value === "" ||
                    value === null ||
                    value === undefined
                ) {
                    next.delete(key);
                } else {
                    next.set(key, String(value));
                }
            }

            return next;
        });
    }, [setSearchParams]);

    return {
        ...params,
        updateParams,
    };
    
};