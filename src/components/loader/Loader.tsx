const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-sm" />
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${20 + i * 7}%`,
              top: `${10 + i * 6}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: "2s",
            }}
          >
            <div className="w-1 h-1 bg-yellow-300 rounded-full opacity-60" />
          </div>
        ))}
      </div>

      <div className="text-center relative z-10">
        <div className="relative mb-6">
          <div className="w-20 h-20 border-2 border-purple-400/30 rounded-full animate-spin mx-auto relative">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            </div>
            <div className="absolute -bottom-1 right-0">
              <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Inner orbit */}
          <div
            className="absolute top-2 left-2 w-16 h-16 border border-indigo-400/20 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "3s" }}
          >
            <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-1 bg-purple-300 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Center mystic symbol */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-purple-500/20">
              <span className="text-white text-sm">✦</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-center items-center space-x-2">
            {["♈", "♌", "♐", "♓"].map((symbol, index) => (
              <span
                key={index}
                className="text-lg text-purple-300 animate-pulse opacity-60"
                style={{
                  animationDelay: `${index * 0.5}s`,
                  animationDuration: "1.5s",
                }}
              >
                {symbol}
              </span>
            ))}
          </div>
        </div>
        <div className="text-center">
          <p className="text-white/80 text-sm font-light tracking-wide animate-pulse">
            Loading...
          </p>

          <div className="flex justify-center space-x-1 mt-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>
        </div>

        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-600/10 rounded-full blur-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
