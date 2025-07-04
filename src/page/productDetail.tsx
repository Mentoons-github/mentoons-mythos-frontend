import Details from "../components/productDetail/details";
import ProductImages from "../components/productDetail/productImages";
import ProductSlider from "../components/productDetail/productSlider";
import Review from "../components/productDetail/review";

const ProductDetail = () => {
  const products = [
    {
      id: 1,
      name: "Zodiac T-Shirt",
      description: "Perfect Aries design for fire signs",
      price: "₹1,999",
      image: "/assets/mythosProducts/mockup-1.png",
    },
    {
      id: 2,
      name: "Planet Hoodie",
      description: "Jupiter-inspired cosmic comfort",
      price: "₹3,499",
      image: "/assets/mythosProducts/mockup5.png",
    },
    {
      id: 3,
      name: "Constellation Cap",
      description: "Night sky pattern, adjustable fit",
      price: "₹1,499",
      image: "/assets/mythosProducts/tote-bag-mockup.png",
    },
    {
      id: 4,
      name: "Mythology Tote",
      description: "Greek gods artwork, eco-friendly",
      price: "₹999",
      image: "/assets/mythosProducts/image 23.png",
    },
    {
      id: 5,
      name: "Zodiac T-Shirt",
      description: "Perfect Aries design for fire signs",
      price: "₹1,999",
      image: "/assets/mythosProducts/mockup6.png",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10">
      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-10">
        <div className="w-full lg:w-1/2">
          <ProductImages />
        </div>
        <div className="w-full lg:w-1/2">
          <Details />
        </div>
      </div>

      {/* Related Items Section */}
      <div className="mt-16 sm:mt-20 lg:mt-30 space-y-4 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold font-montserrat">
          Related Items :
        </h1>
        <ProductSlider products={products} />
      </div>

      {/* Reviews Section */}
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <Review />
      </div>
    </div>
  );
};

export default ProductDetail;
