import { FaFacebook, FaInstagram, FaLink, FaWhatsapp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface ShareOptionProps {
  blogUrl: string;
  onClose: () => void;
}

const ShareOption = ({ blogUrl, onClose }: ShareOptionProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link.");
      console.log(err)
    }
  };

  return (
    <div className="absolute z-10 bottom-0 mt-2 p-2 bg-white border rounded shadow-md w-48">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-gray-600 hover:text-red-500"
        >
          <IoMdClose size={20} />
        </button>

        <div className="mt- space-y-2">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(blogUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <FaWhatsapp className="text-4xl text-green-600" /> WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              blogUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <FaFacebook className="text-4xl text-blue-600" /> Facebook
          </a>
          <div
            onClick={() => alert("Instagram sharing is not supported directly.")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaInstagram className="text-4xl text-pink-600" /> Instagram
          </div>
          <button onClick={handleCopy} className="flex items-center gap-2">
            <FaLink className="text-4xl text-gray-600" /> Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareOption;
