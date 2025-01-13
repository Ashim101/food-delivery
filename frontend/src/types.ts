
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
    menuItems: MenuItem[];
    cuisines: string[];
    image: string;
    restraurantName: string;
    delieveryPrice: number;
    estimatedDelieveryTime: number;
    city: string;
    country: string;
}
