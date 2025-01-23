import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
// import { Restraurant } from "../types"
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestraurantRequest = async (): Promise<Restaurant> => {
    const accesstoken = await getAccessTokenSilently();
    const response = await fetch(`${baseUrl}/api/my/restaurant`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${accesstoken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to Get user");
    }

    return response.json();
  };

  const {
    data: RestraurantData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery("fetchRestraurantData", getMyRestraurantRequest);

  return { RestraurantData, isLoading, isError, isSuccess };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyRestraurantRequest = async (
    restraurantFormData: FormData
  ): Promise<Restaurant> => {
    const accesstoken = await getAccessTokenSilently();
    const response = await fetch(`${baseUrl}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
      body: restraurantFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return response.json();
  };

  const {
    mutateAsync: createRestraurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(createMyRestraurantRequest);
  return { createRestraurant, isLoading, error, isSuccess };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyRestraurantRequest = async (
    restraurantFormData: FormData
  ): Promise<Restaurant> => {
    const accesstoken = await getAccessTokenSilently();
    const response = await fetch(`${baseUrl}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
      body: restraurantFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return response.json();
  };

  const {
    mutateAsync: updateRestraurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateMyRestraurantRequest);
  if (error) {
    toast.error("Unable to update");
  }
  if (isSuccess) {
    toast.success("Updated successfully");
  }
  return { updateRestraurant, isLoading };
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${baseUrl}/api/my/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest
  );

  return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${baseUrl}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantOrder);

  if (isSuccess) {
    toast.success("Order updated");
  }

  if (isError) {
    toast.error("Unable to update order");
    reset();
  }

  return { updateRestaurantStatus, isLoading };
};
