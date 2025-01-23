import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/apis/ManageRestraurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/form/Restraurant-form/RestraurantForm";

const ManageRestaurantPage = () => {
  const { createRestraurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { RestraurantData } = useGetMyRestaurant();
  const { updateRestraurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const { orders } = useGetMyRestaurantOrders();

  const isEditing = !!RestraurantData;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restraurant={RestraurantData}
          onSave={isEditing ? updateRestraurant : createRestraurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
