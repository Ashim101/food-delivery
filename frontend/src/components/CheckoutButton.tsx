import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { useLocation } from "react-router-dom";

type Props = {};

const CheckoutButton = ({}: Props) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { pathname } = useLocation();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" flex justify-center">
      <Button onClick={onLogin} className="bg-orange-500">
        {isAuthenticated ? "Checkout" : "Login to Checkout"}{" "}
      </Button>
    </div>
  );
};

export default CheckoutButton;
