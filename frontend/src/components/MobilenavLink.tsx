import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const MobilenavLink = () => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <Link
        to="/order-status"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Order Status
      </Link>
      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        My Restaurant
      </Link>
      <Link
        to="/user-profile"
        className="font-bold text-black text-base hover:text-orange-500"
      >
        Profile
      </Link>
      <Button className="hover:bg-white hover:text-orange-500">Logout</Button>
    </div>
  );
};

export default MobilenavLink;
