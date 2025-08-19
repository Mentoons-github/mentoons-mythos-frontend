interface FloatingLabelProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const FloatingLabel = ({
  label,
  value,
  onChange,
  type = "text",
}: FloatingLabelProps) => {
  return (
    <div className="relative w-full">
      <input
        value={value}
        type={type}
        onChange={onChange}
        placeholder=""
        className="peer block w-full border-b-2 border-gray-400 bg-transparent px-0 pt-6 pb-2 text-base text-white placeholder-transparent focus:border-white focus:outline-none transition-colors duration-200"
      />
      <label className="absolute left-0 top-2 text-gray-300 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-white peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-white">
        {label}
      </label>
    </div>
  );
};

export default FloatingLabel;
