import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export type Props = {
  menuItem: MenuItem;

  addToCart: () => void;
};

const MenuItems = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">Rs {menuItem.price}</CardContent>
    </Card>
  );
};

export default MenuItems;
