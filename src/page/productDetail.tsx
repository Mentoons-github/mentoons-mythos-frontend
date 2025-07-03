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
    <div className="max-w-7xl p-10 mx-auto">
      <div className="flex justify-between items-start gap-x-10">
        <ProductImages />
        <Details />
      </div>
      <div className="mt-30 space-y-4">
        <h1 className="text-2xl font-bold font-montserrat">Related Items :</h1>
        <ProductSlider products={products} />
      </div>
      <Review />
    </div>
  );
};

export default ProductDetail;
