import { useState } from "react";

interface CommentInputProps {
  onSubmit: (comment: string) => void;
  isOpen: boolean;
  placeholder?:string
}

const CommentInput: React.FC<CommentInputProps> = ({ onSubmit, isOpen, placeholder }) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;
    
    onSubmit(input.trim());
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <form
      className="flex mt-1 h-8 space-x-4 pr-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full border-2 pl-3 text-sm rounded-md font-semibold"
        placeholder={placeholder || "Write a comment"}
      />
      <button type="submit">
        Post
      </button>
    </form>
  );
};

export default CommentInput;