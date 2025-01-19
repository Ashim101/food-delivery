
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

export type Restaurant = {
    _id: string;
    menuItems: MenuItem[];
    cuisines: string[];
    imageUrl?: string;
    image?: File;
    restaurantName: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    city: string;
    country: string;
}


export type RestraurantSearchResponse={
    data:Restaurant[]
    pagination:{
        total:number;
        totalPages:number;
        page:number;
    };
};