import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span>
      {isAuthenticated ? (
        <div className="flex gap-4">
          <Link to="/order-status" className="font-bold hover:text-orange-500">
            Order Status
          </Link>
          <UsernameMenu />
        </div>
      ) : (
        <Button
          onClick={() => loginWithRedirect()}
          className="font-bold hover:bg-white hover:text-orange-500"
        >
          Login
        </Button>
      )}
    </span>
  );
};

export default MainNav;
