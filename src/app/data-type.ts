export interface SignUp {


    name: string;
    password: string;
    email: string;
}


export interface Product {

    id?: number;
    name?: string;
    price?: number;
    color?: string;
    category?: string;
    description?: string;
    image?: string;
    quantity?: number;
    productId?: number;
}

export interface Cart {
    id?: number;
    name?: string;
    price?: number;
    color?: string;
    category?: string;
    description?: string;
    image?: string;
    quantity?: number;
    userId?: number;
    productId?: number;
}

export interface PriceSummary {

    price: number;
    discount: number;
    tax: number;
    delivery: number;
    total: number
}

export interface Order {
    email: string;
    address: string;
    contact: string;
    totalPrice: number;
    userId: number;
    id?: number
}
