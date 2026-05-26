import {
  FaFacebookF,
  FaLink,
  FaWhatsapp,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";

interface ShareOptionProps {
  blogUrl: string;
  onClose: () => void;
}

const ShareOption = ({ blogUrl, onClose }: ShareOptionProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      toast.success("Link copied");
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      link: `https://wa.me/?text=${encodeURIComponent(blogUrl)}`,
      color: "hover:bg-green-500/10 hover:text-green-500",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        blogUrl,
      )}`,
      color: "hover:bg-blue-500/10 hover:text-blue-500",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        blogUrl,
      )}`,
      color: "hover:bg-sky-500/10 hover:text-sky-500",
    },

    {
      name: "Telegram",
      icon: <FaTelegramPlane />,
      link: `https://t.me/share/url?url=${encodeURIComponent(blogUrl)}`,
      color: "hover:bg-cyan-500/10 hover:text-cyan-500",
    },
  ];

  return (
    <div
      className="absolute bottom-14 left-0 z-50 w-72 rounded-2xl border border-border bg-background/95 backdrop-blur-md shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-200"
      
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-foreground">
          Share this blog
        </h2>

        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-muted transition"
        >
          <IoMdClose size={20} />
        </button>
      </div>

      {/* Share Grid */}
      <div className="grid grid-cols-3 gap-3">
        {shareLinks.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-border bg-secondary/40 transition-all duration-200 hover:scale-105 ${item.color}`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.name}</span>
          </a>
        ))}

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-border bg-secondary/40 transition-all duration-200 hover:scale-105 hover:bg-gray-500/10 hover:text-gray-400"
        >
          <FaLink className="text-2xl" />
          <span className="text-xs font-medium">Copy Link</span>
        </button>
      </div>

      {/* URL Preview */}
      <div className="mt-4 rounded-lg bg-muted p-2 text-xs text-muted-foreground truncate">
        {blogUrl}
      </div>
    </div>
  );
};

export default ShareOption;
