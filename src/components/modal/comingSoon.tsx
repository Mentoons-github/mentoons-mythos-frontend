const ComingSoon = () => {
  return (
    <div className="absolute inset-0 bg-background backdrop-blur-sm z-50 flex justify-center items-center rounded-xl">
      <div className="relative max-w-lg mx-auto px-6 py-8 text-center">
        {/* Decorative background elements */}
        <div className="absolute -top-6 -left-6 w-20 h-20 bg-foreground/5 rounded-full blur-xl"></div>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-foreground/3 rounded-full blur-2xl"></div>

        <div className="relative space-y-6 flex flex-col justify-center items-center">
          {/* Image container with enhanced styling */}
          <div className="relative w-20 h-20 mb-3">
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 to-foreground/5 rounded-full blur-lg transform scale-110"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-foreground/10 shadow-xl">
              <img
                src="/assets/profile/planet.png"
                alt="planet"
                className="w-full h-full object-cover filter grayscale contrast-110

                "
              />
            </div>
          </div>

          {/* Main heading with birth chart message */}
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-[0.15em] text- mb-1 relative">
              BIRTH CHART
              <span className="block text-2xl md:text-3xl mt-0.5 font-light tracking-[0.2em]">
                COMING SOON
              </span>
              {/* Subtle underline */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent"></div>
            </h1>
          </div>

          {/* Description with birth chart context */}
          <div className="max-w-xs mx-auto space-y-3">
            <p className="text-sm text-foreground/80 font-medium tracking-wide leading-relaxed">
              Your personalized birth chart experience is on the way. We're
              crafting a cosmic journey to unlock the secrets of the stars.
            </p>

            {/* Animated dots */}
            <div className="flex justify-center space-x-1.5 pt-2">
              <div className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-pulse"></div>
              <div
                className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1.5 h-1.5 bg-foreground/20 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="pt-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
