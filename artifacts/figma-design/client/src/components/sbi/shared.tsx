export const A = (name: string) => `${import.meta.env.BASE_URL}figmaAssets/${name}`;
export const F = {
  made: "'MADE Okine Sans PERSONAL USE', 'Outfit', sans-serif",
  mooxy: "'mooxy-Regular', 'mooxy', 'Outfit', sans-serif",
  origin: "'Origin', 'Fraunces', serif",
  instrument: "'Instrument Sans', sans-serif",
};
export const BLUE = "#1470cb";

export type Preview = (label: string) => void;

/** Figma vectors are authored rotated -90deg inside a size container. w/h are the visual (rotated) box. */
export function RotArrow({ src, w, h, inset }: { src: string; w: number; h: number; inset: string }) {
  return (
    <span className="relative block shrink-0" style={{ width: w, height: h }} aria-hidden="true">
      <span
        className="absolute left-1/2 top-1/2 block"
        style={{ width: h, height: w, transform: "translate(-50%,-50%) rotate(-90deg)" }}
      >
        <span className="absolute block" style={{ inset }}>
          <img alt="" className="block h-full w-full max-w-none" src={src} />
        </span>
      </span>
    </span>
  );
}

export function Star() {
  return (
    <span className="relative block h-[19px] w-[19px] shrink-0" aria-hidden="true">
      <span className="absolute block" style={{ inset: "0 2.45% 9.55% 2.45%" }}>
        <img alt="" className="block h-full w-full max-w-none" src={A("imgStar1.svg")} />
      </span>
    </span>
  );
}
