import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchProductsThunk } from "../features/products/productThunk";
import { useEffect } from "react";

const Products = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  //   const products = [
  //     {
  //       id: 1,
  //       title: "Mythos Journal",
  //       price: 599,
  //       category: "Journal",
  //       image:
  //         "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
  //     },
  //     {
  //       id: 2,
  //       title: "Bhagavad Gita",
  //       price: 899,
  //       category: "Book",
  //       image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
  //     },
  //     {
  //       id: 3,
  //       title: "Wisdom Hoodie",
  //       price: 1499,
  //       category: "Apparel",
  //       image:
  //         "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  //     },
  //     {
  //       id: 4,
  //       title: "Mythos Mug",
  //       price: 399,
  //       category: "Accessories",
  //       image:
  //         "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=600",
  //     },
  //     {
  //       id: 5,
  //       title: "Reflection Cards",
  //       price: 699,
  //       category: "Cards",
  //       image:
  //         "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?w=600",
  //     },
  //     {
  //       id: 6,
  //       title: "Ancient Wisdom Notebook",
  //       price: 499,
  //       category: "Notebook",
  //       image:
  //         "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600",
  //     },
  //   ];

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, []);
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2F4858] to-[#4A6572] text-white py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">Mythos Store</h1>

          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            Books, journals, apparel, and collectibles designed to inspire
            wisdom, creativity, and self-discovery.
          </p>
        </div>
      </section>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-[#2F4858]"
          />
        </div>
      </div>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="overflow-hidden rounded-2xl bg-card shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex items-center justify-center h-48 p- bg-muted">
                <img
                  src={product.thumbnails[0]}
                  alt={product.title}
                  className=" h-full  object-cover"
                />
              </div>

              <div className="p-5">
                <h2 className="mt-2 text font-semibold ">{product.title}</h2>

                <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                  <p>● Total pages: {product.pages}</p>
                  <p>● Page size: {product.size}</p>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <span className="text-2xl font-extrabold text-orange-500">
                    ₹{product.offerPrice}
                  </span>

                  <span className="text-gray-400 line-through">
                    ₹{product.price}
                  </span>

                  <span className="rounded-full bg-green-100 px-2 py-1 text-sm font-semibold text-green-700">
                    {Math.round(
                      ((product.price - product.offerPrice) / product.price) *
                        100,
                    )}
                    % OFF
                  </span>
                </div>

                <a
                  href={`https://mentoons.com/products/${product._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="mt-5 w-full rounded-full bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground cursor-pointer py-3 font-">
                    Available Mentoons
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products;
