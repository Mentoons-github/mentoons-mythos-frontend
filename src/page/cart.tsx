import { BiShoppingBag } from "react-icons/bi";
import CartItem from "../components/cart/items";
import { useState } from "react";
import OrderSummary from "../components/cart/orderSummary";
import Pagination from "../components/common/pagination";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Constellation Cap",
      image: "/assets/mythosProducts/tote-bag-mockup.png",
      color: "White",
      size: "M",
      price: 500,
      quantity: 1,
      inStock: true,
    },
    {
      id: 2,
      name: "Minimalist Tote",
      image: "/assets/mythosProducts/tote-bag-mockup.png",
      color: "Black",
      size: "L",
      price: 750,
      quantity: 2,
      inStock: true,
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-7 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tight">
            MY CART
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-black mx-auto mt-3 sm:mt-4" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-6 gap-6 sm:gap-8 xl:gap-10">
          {/* Cart Items */}
          <div className="xl:col-span-4">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 sm:pb-4">
                <h2 className="text-lg sm:text-xl font-bold text-black">
                  Shopping Cart
                </h2>
                <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {cartItems.length} Item{cartItems.length !== 1 ? "s" : ""}
                </span>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12 sm:py-16 md:py-24">
                  <BiShoppingBag className="mx-auto text-6xl sm:text-7xl md:text-8xl text-gray-300 mb-6 sm:mb-8" />
                  <p className="text-lg sm:text-xl text-gray-500 mb-6 sm:mb-8">
                    Your cart is empty
                  </p>
                  <button className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors duration-200">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <OrderSummary cartItems={cartItems} />
        </div>
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default Cart;
