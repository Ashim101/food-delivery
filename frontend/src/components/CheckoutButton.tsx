import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/form/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/apis/MyUserApi";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
};

const CheckoutButton = ({ disabled, onCheckout }: Props) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { pathname } = useLocation();

  const { userProfileData, isLoading: isGetLoading } = useGetMyUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (isLoading || !userProfileData) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    <div className=" flex justify-center">
      <Button onClick={onLogin} className="bg-orange-500">
        Login to Checkout
      </Button>
    </div>;
  }
  return (
    <div className="flex justify-center py-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={disabled} className="bg-orange-500 ">
            Checkout
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-orange-50">
          <UserProfileForm
            isLoading={isGetLoading}
            userProfileData={userProfileData}
            title="Confirm Delievery"
            buttonText="Confirm"
            onSave={onCheckout}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutButton;
