export function FigmaFooterEffect({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={{ overflow: "hidden", ...style }} aria-hidden="true">
      <img
        src="/__mockup/images/imgImage3.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
