import Stripe from "stripe";
import { Request, Response } from "express";
import Restaurant, { MenuItemType } from "../models/restraurantModel"
import Order from "../models/orderModel";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;


const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};
const createCheckoutSession = async (req: Request, res: Response) => {
    try {
      const checkoutSessionRequest: CheckoutSessionRequest = req.body;

  
      const restaurant = await Restaurant.findById(
        checkoutSessionRequest.restaurantId
      );
  
      if (!restaurant) {
        throw new Error("Restaurant not found");
      }
  
      const newOrder = new Order({
        restaurant: restaurant._id,
        user: req.userId,
        status: "placed",
        deliveryDetails: checkoutSessionRequest.deliveryDetails,
        cartItems: checkoutSessionRequest.cartItems,
        createdAt: new Date(),
      });
  
    const plainMenuItems: MenuItemType[] = restaurant.menuItems.map(item => item.toObject() as MenuItemType);

    const lineItems = createLineItems(
      checkoutSessionRequest,
      plainMenuItems // Pass the plain array of menu items
    );
  
      const session = await createSession(
        lineItems,
        newOrder._id.toString(),
        restaurant.deliveryPrice,
        restaurant._id.toString()
      );
  
      if (!session.url) {
        return res.status(500).json({ message: "Error creating stripe session" });
      }
      await newOrder.save()


  
    //   await newOrder.save();
      res.json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ message: error.raw.message });
    }
  };
  
  const createLineItems = (
    checkoutSessionRequest: CheckoutSessionRequest,
    menuItems: MenuItemType[]
  ) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
      const menuItem = menuItems.find(
        (item) => item._id.toString() === cartItem.menuItemId.toString()
      );
  
      if (!menuItem) {
        throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
      }
  
      const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
        price_data: {
          currency: "npr",
          unit_amount: menuItem.price*100,
          product_data: {
            name: menuItem.name,
          },
        },
        quantity: parseInt(cartItem.quantity),
      };
  
      return line_item;
    });
  
    return lineItems;
  };
  
  const createSession = async (
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    orderId:string,

    // orderId: string,
    deliveryPrice: number,
    restaurantId: string

  ) => {
    const sessionData = await STRIPE.checkout.sessions.create({
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery",
            type: "fixed_amount",
            fixed_amount: {
              amount: deliveryPrice*100,
              currency: "npr",
            },
          },
        },
      ],
      mode: "payment",
      metadata: {
        orderId,
        restaurantId
      },
      success_url: `${FRONTEND_URL}/order-status?success=true`,
      cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
    });
  
    return sessionData;
  };


  const stripeWebhookHandler = async (req: Request, res: Response) => {
    let event;
  
    try {
      const sig = req.headers["stripe-signature"];
      event = STRIPE.webhooks.constructEvent(
        req.body,
        sig as string,
        STRIPE_ENDPOINT_SECRET
      );
    } catch (error: any) {
      return res.status(400).send(`Webhook error: ${error.message}`);
    }
  
    
    
    if (event.type === "checkout.session.completed" && event.data.object.payment_status==="paid") {
      const orderId=event.data.object.metadata?.orderId
      if (!orderId) {
        return res.status(400).json({ message: "Order ID is missing in the metadata" });
      }
  
      const order = await Order.findById(event.data.object.metadata?.orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      const amountTotal = event.data.object.amount_total;
  
      if (typeof amountTotal !== 'number' || isNaN(amountTotal)) {
        return res.status(400).json({ message: "Invalid amount_total received" });
      }
      order.totalAmount = amountTotal/100;
      order.status = "paid";
  
      await order.save();
    }
  
    res.status(200).send();
  };
  
  export  {
    createCheckoutSession,
    stripeWebhookHandler,getMyOrders
  };

