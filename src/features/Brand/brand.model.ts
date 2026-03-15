




export interface Brands {
    brand_id: number
    brand_name: string
    created_at: string
}

export interface CreateBrand {
    brand_name: string
}

export interface UpdateBrand {
    brand_id: number
    brand_name: string
}