interface DateLabelProps {
  date: string;
}

const DateLabel = ({ date }: DateLabelProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center font-semibold text-sm my-2 py-0.5 px-3 rounded-xl bg-foreground text-background">
        {date}
      </div>
    </div>
  );
};

export default DateLabel