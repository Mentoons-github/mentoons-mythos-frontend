import { Clock } from "lucide-react";

const QrScanner = () => {
  return (
    <div className="bg-black p-6 rounded-2xl shadow-2xl flex flex-col w-56 md:w-full items-center border-2 border-white ">
      <div className="text-center mb-4">
        <p className="text-white text-base font-medium tracking-wide">
          Scan to Contribute ₹1
        </p>
        <p className="text-white text-xs mt-1">Support us with a quick scan!</p>
      </div>
      <div className="relative p-4 bg-white rounded-xl shadow-inner group ">
        <img
          src="/assets/footer/qrCode.jpg"
          className="w-40 h-40 rounded-lg transition-transform duration-300 group-hover:scale-105"
          alt="QR Code for contributing 1 rupee"
        />
        <div className="absolute -top-3 -right-3 bg-white text-black text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
          ₹1
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 rounded-xl">
          <span className="text-white text-xs font-medium">Scan Now</span>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-center text-sm mt-3">
        <Clock size={15} />
        <span>Instant & Secure</span>
      </div>
      <div className="relative group">
        <span className="absolute hidden group-hover:block -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2">
          Scan with your phone to contribute
        </span>
      </div>
    </div>
  );
};

export default QrScanner;
