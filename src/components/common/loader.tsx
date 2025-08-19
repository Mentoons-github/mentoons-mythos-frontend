import { useState, useEffect } from "react";

const UpLoader = () => {
  const messages = [
    "Reading the Stars...",
    "Aligning the Cosmos...",
    "Consulting the Zodiac...",
    "Unveiling Your Destiny...",
    "Charting the Heavens...",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mb-4"></div>
        <p className="text-white text-2xl font-bold animate-pulse">
          {messages[currentMessage]}
        </p>
      </div>
    </div>
  );
};

export default UpLoader;
