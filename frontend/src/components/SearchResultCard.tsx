import { Restaurant } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  restraurant: Restaurant;
};

const SearchResultCard = ({ restraurant }: Props) => {
  console.log(restraurant);
  return (
    <Link to={`/details/${restraurant._id}`}>
      <div className="grid lg:grid-cols-[2fr,3fr] gap-4 group">
        <AspectRatio ratio={16 / 9}>
          <img
            src={restraurant.imageUrl}
            alt=""
            className="w-full h-full object-cover rounded-md "
          />
        </AspectRatio>

        <div className="flex flex-col  w-full gap-4">
          <p className="text-2xl font-bold group-hover:underline">
            {restraurant.restaurantName}
          </p>
          <div className="flex flex-col lg:flex-row gap-5 justify-between lg:pr-2 lg:gap-4 ">
            <div className="flex  flex-wrap  gap-2  ">
              {restraurant.cuisines.map((cuisine, index) => (
                <p
                  key={index}
                  className="flex items-center text-sm leading-none "
                >
                  {cuisine}
                  {index !== restraurant.cuisines.length - 1 && (
                    <Dot className="ml-1" />
                  )}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex gap-1">
                <Clock className="text-green-600" />
                <p>{restraurant.estimatedDeliveryTime} mins</p>
              </div>
              <div className="flex gap-1">
                <Banknote />
                <p>{restraurant.deliveryPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
