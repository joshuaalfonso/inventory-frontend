import { useMemo } from "react";
import type { Brands } from "../brand.model";

export const useBrandSearch = (brands: Brands[], search: string) => {
    return useMemo(() => {
        const keyword = search.toLowerCase().trim();

        if (!keyword) return brands;

        return brands.filter((p) => {
            const name = p.brand_name?.toLowerCase() || '';
            return name.includes(keyword);
        });
    }, [brands, search]);
};