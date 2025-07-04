import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Share2,
  Star,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew: boolean;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const PremiumImageModal = ({ isOpen, onClose, product }: ImageModalProps) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 300);
    } else {
      document.body.style.overflow = "unset";
      setZoom(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case " ":
          e.preventDefault();
          handleZoomToggle();
          break;
        case "r":
        case "R":
          handleRotate();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, zoom]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 0.5));
    if (zoom <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleZoomToggle = () => {
    if (zoom === 1) {
      setZoom(2);
    } else {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = product.image;
    link.download = `${product.name.replace(/\s+/g, "_")}.jpg`;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch (error) {
        console.log("Error copying to clipboard:", error);
      }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Modal content
  const modalContent = (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity duration-500"
        onClick={handleBackdropClick}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>

      {/* Modal Content */}
      <div className="relative z-10 max-w-6xl max-h-screen w-full h-full flex flex-col p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 p-4 bg-gradient-to-r from-black/50 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-150"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-300"></div>
            <div className="ml-4 text-white font-semibold truncate max-w-xs">
              {product.name}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={handleZoomOut}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                title="Zoom Out (-)"
              >
                <ZoomOut className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={handleZoomIn}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                title="Zoom In (+)"
              >
                <ZoomIn className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={handleRotate}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                title="Rotate (R)"
              >
                <RotateCw className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={handleDownload}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                title="Download"
              >
                <Download className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                title="Share"
              >
                <Share2 className="h-5 w-5 text-white" />
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              title="Close (ESC)"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white text-lg">Loading image...</p>
              </div>
            </div>
          )}

          <img
            src={product.image}
            alt={product.name}
            className={`max-w-full max-h-full object-contain transition-all duration-500 select-none ${
              zoom > 1 ? "cursor-grab" : "cursor-zoom-in"
            } ${isDragging ? "cursor-grabbing" : ""}`}
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg) translate(${
                position.x / zoom
              }px, ${position.y / zoom}px)`,
              transition: isDragging ? "none" : "transform 0.3s ease",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            draggable={false}
            onClick={zoom === 1 ? handleZoomToggle : undefined}
          />

          {/* Zoom indicator */}
          {zoom !== 1 && (
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              {Math.round(zoom * 100)}%
            </div>
          )}

          {/* Instructions */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-xl text-sm backdrop-blur-sm opacity-70">
            <div className="hidden sm:block">
              Space: Zoom • R: Rotate • Drag: personally • ESC: Close
            </div>
            <div className="sm:hidden">Tap to zoom • Drag to pan</div>
          </div>
        </div>

        {/* Product Info Footer */}
        <div className="mt-4 p-6 bg-gradient-to-r from-black/50 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-400">{product.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-400 text-sm">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {product.price}
                </div>
                <div className="text-sm text-gray-400">{product.category}</div>
              </div>
              <button
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  product.inStock
                    ? "bg-gradient-to-r from-white to-gray-200 text-black hover:shadow-lg hover:shadow-white/30"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="sm:hidden mt-4 flex justify-center space-x-3">
          <button
            onClick={handleZoomOut}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
          >
            <ZoomOut className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
          >
            <ZoomIn className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={handleRotate}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
          >
            <RotateCw className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={handleDownload}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
          >
            <Download className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={handleShare}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
          >
            <Share2 className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );

  // Render modal at the root of the DOM using createPortal
  return createPortal(modalContent, document.body);
};

export default PremiumImageModal;
