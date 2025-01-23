import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

import { User } from "../types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: String;
  email: String;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accesstoken = await getAccessTokenSilently();

    const response = await fetch(`${baseUrl}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accesstoken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);
  return { createUser, isLoading, isError, isSuccess };
};
export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyUserRequest = async (): Promise<User> => {
    const accesstoken = await getAccessTokenSilently();
    const response = await fetch(`${baseUrl}/api/my/user`, {
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
    data: userProfileData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery("fetchUserProfileData", getMyUserRequest);

  return { userProfileData, isLoading, isError, isSuccess };
};

type UpdateUserRequest = {
  name: String;
  addressLine1: String;
  country: String;
  city: String;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyUserRequest = async (formData: UpdateUserRequest) => {
    const accesstoken = await getAccessTokenSilently();
    const response = await fetch(`${baseUrl}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accesstoken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);
  if (isSuccess) {
    toast.success("User Profile Updated.");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }
  return { updateUser, isLoading, isError, isSuccess };
};
