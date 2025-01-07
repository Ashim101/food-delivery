import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        <span>
            {isAuthenticated ? (
                <UsernameMenu />
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
