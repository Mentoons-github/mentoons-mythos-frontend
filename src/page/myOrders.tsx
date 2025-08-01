import { Star, Package } from "lucide-react";

const AstrologyOrdersPage = () => {
  // const products = [
  //   {
  //     id: 1,
  //     name: "Zodiac T-Shirt",
  //     description: "Perfect Aries design for fire signs",
  //     price: "₹1,999",
  //     image: "/assets/mythosProducts/mockup-1.png",
  //     status: "completed",
  //     date: "2024-07-05",
  //     deliveryDate: "2024-07-08",
  //   },
  //   {
  //     id: 2,
  //     name: "Planet Hoodie",
  //     description: "Jupiter-inspired cosmic comfort",
  //     price: "₹3,499",
  //     image: "/assets/mythosProducts/mockup5.png",
  //     status: "in-progress",
  //     date: "2024-07-01",
  //     deliveryDate: "2024-07-12",
  //   },
  //   {
  //     id: 3,
  //     name: "Constellation Cap",
  //     description: "Night sky pattern, adjustable fit",
  //     price: "₹1,499",
  //     image: "/assets/mythosProducts/tote-bag-mockup.png",
  //     status: "completed",
  //     date: "2024-06-28",
  //     deliveryDate: "2024-07-02",
  //   },
  //   {
  //     id: 4,
  //     name: "Mythology Tote",
  //     description: "Greek gods artwork, eco-friendly",
  //     price: "₹999",
  //     image: "/assets/mythosProducts/image 23.png",
  //     status: "pending",
  //     date: "2024-06-25",
  //     deliveryDate: "2024-07-15",
  //   },
  //   {
  //     id: 5,
  //     name: "Zodiac T-Shirt",
  //     description: "Perfect Aries design for fire signs",
  //     price: "₹1,999",
  //     image: "/assets/mythosProducts/mockup6.png",
  //     status: "completed",
  //     date: "2024-07-03",
  //     deliveryDate: "2024-07-06",
  //   },
  //   {
  //     id: 6,
  //     name: "Planet Hoodie",
  //     description: "Jupiter-inspired cosmic comfort",
  //     price: "₹3,499",
  //     image: "/assets/mythosProducts/mock6 1.png",
  //     status: "in-progress",
  //     date: "2024-06-30",
  //     deliveryDate: "2024-07-10",
  //   },
  //   {
  //     id: 7,
  //     name: "Constellation Cap",
  //     description: "Night sky pattern, adjustable fit",
  //     price: "₹1,499",
  //     image: "/assets/mythosProducts/mockup4.png",
  //     status: "pending",
  //     date: "2024-06-27",
  //     deliveryDate: "2024-07-14",
  //   },
  //   {
  //     id: 8,
  //     name: "Mythology Tote",
  //     description: "Greek gods artwork, eco-friendly",
  //     price: "₹999",
  //     image: "/assets/mythosProducts/mockup-2.png",
  //     status: "completed",
  //     date: "2024-07-02",
  //     deliveryDate: "2024-07-05",
  //   },
  // ];
  

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "completed":
  //       return "text-green-400 bg-green-900/20";
  //     case "in-progress":
  //       return "text-yellow-400 bg-yellow-900/20";
  //     case "pending":
  //       return "text-gray-400 bg-gray-900/20";
  //     default:
  //       return "text-gray-400 bg-gray-900/20";
  //   }
  // };

  // const getStatusIcon = (status: string) => {
  //   switch (status) {
  //     case "completed":
  //       return <Package className="w-4 h-4" />;
  //     case "in-progress":
  //       return <Clock className="w-4 h-4" />;
  //     case "pending":
  //       return <Calendar className="w-4 h-4" />;
  //     default:
  //       return <Clock className="w-4 h-4" />;
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated Stars Background */}
      {/* <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <Star className="w-1 h-1 text-white opacity-60" />
          </div>
        ))}
      </div> */}

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center backdrop-blur-sm border border-white/10">
              <Star className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            My Purchases
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Track your merchandise orders
          </p>
        </div>

        {/* Tab Navigation */}
        {/* <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10">
            {["all", "completed", "in-progress", "pending"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTab === tab
                    ? "bg-white text-black shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
              </button>
            ))}
          </div>
        </div> */}

        {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((order, index) => (
            <div
              key={order.id}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">
                <img
                  src={order.image}
                  alt={order.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-gray-100 transition-colors">
                      {order.name}
                    </h3>
                    <p className="text-gray-400 text-sm font-mono">
                      ORD-2024-00{order.id}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm">{order.description}</p>

                <div
                  className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)}
                  <span className="capitalize">
                    {order.status.replace("-", " ")}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Order Date</span>
                    <span className="text-white font-medium">{order.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Price</span>
                    <span className="text-white font-bold">{order.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Delivery</span>
                    <span className="text-white font-medium">
                      {order.deliveryDate}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  {order.status === "completed" && (
                    <button className="flex-1 bg-white text-black py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                      <Package className="w-4 h-4" />
                      <span>Track Order</span>
                    </button>
                  )}
                  <button className="flex-1 bg-white/10 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center space-x-2 border border-white/20">
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div> */}

        {/* Empty State */}
        {/* {products.length === 0 && ( */}
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No orders found
            </h3>
            <p className="text-gray-400">
              You don't have any orders with this status yet.
            </p>
          </div>
        {/* )} */}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-white/10">
          <p className="text-gray-400">
            Need help? Contact our cosmic support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default AstrologyOrdersPage;
