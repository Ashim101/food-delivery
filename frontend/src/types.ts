
export type User = {
    _id: string,
    email: string,
    name: string,
    country: string,
    addressLine1: string,
    city: string



}

export type MenuItem = {
    _id: string
    name: string
    price: number
}

export type Restraurant = {
    _id: string;
    menuItems: MenuItem[];
    cuisines: string[];
    imageUrl?: string;
    image?: File;
    restraurantName: string;
    delieveryPrice: number;
    estimatedDelieveryTime: number;
    city: string;
    country: string;
}
