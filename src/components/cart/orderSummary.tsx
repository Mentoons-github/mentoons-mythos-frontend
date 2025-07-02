interface Item {
  id: number;
  name: string;
  image: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  inStock: boolean;
}

interface OrderSummaryProps {
  cartItems: Item[];
}

const OrderSummary = ({ cartItems }: OrderSummaryProps) => {
  const getSubtotal = () => {
    return cartItems.reduce(
      (total: number, item: Item) => total + item.price * item.quantity,
      0
    );
  };

  const getTax = () => {
    return Math.round(getSubtotal() * 0.18);
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  return (
    <div className="mt-6 xl:mt-0 xl:col-span-2">
      <div className="bg-gray-50 border border-gray-200 p-4 sm:p-6 md:p-8 sticky top-4">
        <h2 className="text-lg sm:text-xl font-bold text-black mb-6 tracking-tight">
          Order Summary
        </h2>

        <div className="space-y-4">
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">
                Enter coupon code
              </h3>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="text"
                  className="flex-grow border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black rounded-sm sm:rounded-none"
                  placeholder="Coupon code"
                />
                <button className="bg-black text-white px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors duration-200 rounded-sm sm:rounded-none">
                  Submit
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider">
                Subtotal
              </span>
              <span className="font-bold text-black">
                ₹{getSubtotal().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider">
                Tax (18% GST)
              </span>
              <span className="font-bold text-black">
                ₹{getTax().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider">
                Shipping
              </span>
              <span className="font-bold text-black">Free</span>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300" />

          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-lg font-bold text-black uppercase tracking-wider">
              Total
            </span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-black">
              ₹{getTotal().toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-3 mt-6">
          <button className="w-full bg-black text-white py-3 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors duration-200 rounded-sm">
            Proceed to Checkout
          </button>

          <button className="w-full border border-gray-300 text-black py-3 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors duration-200 rounded-sm">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
