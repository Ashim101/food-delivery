import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchInfo = ({ total, city }: Props) => {
  return (
    <div className=" flex justify-between px-2">
      <div className="flex gap-2 items-end">
        <p className="font-bold text-base">
          {total} Restrauarants found in {city}
        </p>
        <Link to="/" className="text-sm font-semibold text-blue-500 underline">
          {" "}
          Change Location
        </Link>
      </div>
    </div>
  );
};

export default SearchInfo;
