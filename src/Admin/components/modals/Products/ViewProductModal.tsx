import { X, BookOpen, IndianRupee, FileText, Ruler } from "lucide-react";
import { Product2 } from "../../../../types/products";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product2 | null;
}

const ViewProductModal = ({ isOpen, onClose, product }: Props) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[350px] md:max-w-5xl max-h-[95vh] overflow-y-auto rounded-xl shadow-lg  bg-secondary hide-scrollbar">
        {/* Header */}
        <div className="relative border-b  px-8 py-5">
          <h2 className="text-3xl font-extrabold ">Product Details</h2>
          <p className="mt-1 text-muted-foreground">
            View complete information about this product.
          </p>

          <button
            className="absolute top-4 right-4 hover:text-muted-foreground"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="grid md:grid-cols-3 gap- px-10 py-6 h-[80vh]">
          {/* Product Image */}
          <div className=" space-y-5 col-span-1 overflow-y-auto h-full ">
            {product?.thumbnails.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className="h-56 w-56 rounded-2xl border-2 border-yellow-300 object-cover shadow"
              />
            ))}
          </div>

          {/* Product Details */}
          <div className="space-y-3 col-span-2 overflow-y-auto">
            <h3 className="text-3xl font-extrabold text-">
              {product.title}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Offer Price */}
              <div className="rounded-2xl bg-background p-4 shadow">
                <div className="flex items-center gap-3">
                  <IndianRupee className="text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Offer Price</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{product.offerPrice}
                    </p>
                  </div>
                </div>
              </div>

              {/* Original Price */}
              <div className="rounded-2xl bg-background p-4 shadow">
                <div className="flex items-center gap-3">
                  <IndianRupee className="text-gray-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Original Price</p>
                    <p className="text-xl line-through text-gray-400">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pages */}
              <div className="rounded-2xl bg-background p-4 shadow">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pages</p>
                    <p className="font-bold">{product.pages} Pages</p>
                  </div>
                </div>
              </div>

              {/* Size */}
              <div className="rounded-2xl bg-background p-4 shadow">
                <div className="flex items-center gap-3">
                  <Ruler className="text-pink-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Book Size</p>
                    <p className="font-bold">{product.size}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-background p-4 shadow">
              <h4 className="mb-3 text-lg font-bold text-">
                Description
              </h4>

              <p className="leading-7 text-muted-foreground">{product.description}</p>
            </div>
            <div className="rounded-2xl bg-background p-4 shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="text-red-500" />
                  <div>
                    <h4 className="font-bold">Book PDF</h4>
                    <p className="text-sm text-muted-foreground">
                      Preview or download the product PDF.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={product.data}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600"
                  >
                    View PDF
                  </a>

                  <a
                    href={product.data}
                    download
                    className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
