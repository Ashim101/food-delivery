
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
export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

  export type Order = {
    _id: string;
    restaurant: Restaurant;
    user: User;
    cartItems: {
      menuItemId: string;
      name: string;
      quantity: string;
    }[];
    deliveryDetails: {
      name: string;
      addressLine1: string;
      city: string;
      email: string;
    };
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
    restaurantId: string;
  };