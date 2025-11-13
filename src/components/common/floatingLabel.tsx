interface FloatingLabelProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        placeholder=" "
        className="peer block w-full border-b-2 border-muted-foreground bg-transparent px-0 pt-6 pb-2 text-base  placeholder-transparent focus:border-foreground focus:outline-none transition-colors duration-200"
      />
      <label className="absolute left-0 top-1 text-muted-foreground text-sm transition-all duration-200 ">
        {label}
      </label>
    </div>
  );
};

export default FloatingLabel;
