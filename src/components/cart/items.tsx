import { useState } from "react";
import { BiBookmark, BiHeart, BiMinus, BiPlus, BiTrash } from "react-icons/bi";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    image: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
    inStock: boolean;
  };
  onUpdateQuantity: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveToWishlist = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Item saved to wishlist!");
    }, 1000);
  };

  return (
    <div className="group relative bg-white border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-lg">
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />

      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Product Image and Details */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Product Image */}
            <div className="flex-shrink-0 w-full sm:w-32 md:w-40 lg:w-48">
              <div className="w-full aspect-square bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden group-hover:border-gray-300 transition-colors duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
              {/* Product Info */}
              <div className="sm:col-span-5">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4 tracking-tight">
                  {item.name}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Color
                    </span>
                    <span className="font-medium text-black">{item.color}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </span>
                    <span className="font-medium text-black">{item.size}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.inStock ? "bg-black" : "bg-gray-400"
                      }`}
                    />
                    <span
                      className={`text-xs font-medium uppercase tracking-wider ${
                        item.inStock ? "text-black" : "text-gray-400"
                      }`}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="sm:col-span-3 text-center sm:text-left">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Price
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-black">
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity & Total */}
              <div className="sm:col-span-4 text-center sm:text-left">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Quantity
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-0 border border-gray-200 w-fit mx-auto sm:mx-0">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center border-r border-gray-200 hover:bg-black hover:text-white transition-colors duration-200"
                        disabled={item.quantity <= 1}
                      >
                        <BiMinus className="text-sm" />
                      </button>
                      <span className="w-10 sm:w-12 h-8 sm:h-10 flex items-center justify-center font-bold text-black bg-gray-50">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center border-l border-gray-200 hover:bg-black hover:text-white transition-colors duration-200"
                      >
                        <BiPlus className="text-sm" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-black mt-1">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
            <button
              onClick={() => onRemove(item.id)}
              className="flex items-center gap-2 px-3 py-2 text-black hover:bg-black hover:text-white border border-gray-200 transition-colors duration-200 text-xs sm:text-sm font-medium"
            >
              <BiTrash className="text-sm" />
              Remove
            </button>

            <button
              onClick={handleSaveToWishlist}
              disabled={isSaving}
              className="flex items-center gap-2 px-3 py-2 text-black hover:bg-black hover:text-white border border-gray-200 transition-colors duration-200 text-xs sm:text-sm font-medium disabled:opacity-50"
            >
              <BiHeart className="text-sm" />
              {isSaving ? "Saving..." : "Wishlist"}
            </button>

            <button className="flex items-center gap-2 px-3 py-2 text-black hover:bg-black hover:text-white border border-gray-200 transition-colors duration-200 text-xs sm:text-sm font-medium">
              <BiBookmark className="text-sm" />
              Save Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
