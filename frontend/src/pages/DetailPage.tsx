import { useGetRestraurant } from "@/apis/Restraurantapi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItems from "@/components/MenuItems";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card } from "@/components/ui/card";
import { UserFormData } from "@/form/user-profile-form/UserProfileForm";
import { MenuItem } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const { isLoading, restaurant } = useGetRestraurant(restaurantId);

  const removeFromCart = (item: CartItem) => {
    setCartItems((prev) => {
      const updatedCartItems = prev.filter(
        (eachItem) => eachItem._id !== item._id
      );
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (!restaurant) {
    return <p>No restaurant found</p>;
  }
  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prev) => {
      const existingCartItem = cartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prev.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prev,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(cartItems)
      );

      return updatedCartItems;
    });
  };
  const onCheckout = (userFormData: UserFormData) => {
    console.log(userFormData);
  };
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          alt=""
          className="w-full h-full object-contain"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr,2fr] gap-5">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem: MenuItem) => (
            <MenuItems
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CheckoutButton
              disabled={cartItems.length === 0}
              onCheckout={onCheckout}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
