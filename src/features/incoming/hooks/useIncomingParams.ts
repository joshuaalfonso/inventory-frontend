import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";




export const useIncomingParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 10);
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'created_at';
    const order = (searchParams.get('order') || 'desc') as 'asc' | 'desc';

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

    return {
        page,
        limit,
        search,
        sort,
        order,
        updateParams,
    };

};