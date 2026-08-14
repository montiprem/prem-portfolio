type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: Props) {
  return (
    <div className={`mx-auto lg:max-w-[1200px] xl:max-w-[1366px] 2xl:max-w-[1536px] px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}