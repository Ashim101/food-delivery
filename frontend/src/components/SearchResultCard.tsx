import { Restraurant } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Banknote, Clock, Dot, Watch, WatchIcon } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  restraurant: Restraurant;
};

const SearchResultCard = ({ restraurant }: Props) => {
  return (

      
      <Link to={`/details/${restraurant._id}`}>
        <div className="grid lg:grid-cols-[2fr,3fr] gap-2 group">
            <AspectRatio ratio={16/9}>
                <img src={restraurant.imageUrl} alt="" className="w-full h-full object-cover rounded-md" />
            </AspectRatio>

            <div className="flex gap-4">
                <div className="flex flex-col gap-5 w-full">
                    <p className="text-2xl font-bold">{restraurant.restraurantName}</p>

                    <div className="flex flex-wrap gap-3">
                        {restraurant.cuisines.map((cuisine)=>(<p className="flex gap-1">{cuisine}<Dot/></p>))}
                    </div>

                </div>
                <div className="w-full flex flex-col justify-center gap-2">
                    <p className="flex gap-2 text-green-700"><Clock/>{restraurant.delieveryPrice} mins</p>
                    <p className="flex gap-2 "> <Banknote/> Delievery from {restraurant.estimatedDelieveryTime}</p>


                </div>

            </div>

            <div >

            </div>

        </div>
      
      </Link>
    )
};

export default SearchResultCard;
