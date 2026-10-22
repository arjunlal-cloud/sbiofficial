import { useEffect, useRef, useState, type CSSProperties } from "react";
import { setup, render } from "@/lib/figma-footer-shader";

const imageSrc = `${import.meta.env.BASE_URL}figmaMotionAssets/imgImage3.png`;

/**
 * The Figma footer's authored pattern-refraction shader, applied to its image.
 * The image remains visible on browsers that cannot provide a WebGPU adapter.
 */
export function FigmaFooterEffect({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let disposed = false;
    let observer: ResizeObserver | undefined;
    let device: any;
    let texture: any;
    let frame: any;

    async function initialize() {
      // WebGPU types are not part of the imported app's DOM type library.
      const gpu = (navigator as any).gpu;
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!gpu || !container || !canvas) {
        setStatus("unsupported");
        return;
      }

      try {
        const adapter = await gpu.requestAdapter();
        if (!adapter || disposed) {
          if (!disposed) setStatus("unsupported");
          return;
        }
        device = await adapter.requestDevice();
        if (disposed) {
          device.destroy();
          return;
        }
        const context = (canvas as any).getContext("webgpu");
        if (!context) {
          setStatus("unsupported");
          device.destroy();
          return;
        }
        context.configure({
          device,
          format: gpu.getPreferredCanvasFormat(),
          alphaMode: "premultiplied",
        });

        const image = new Image();
        image.src = imageSrc;
        await image.decode();
        if (disposed) return;

        frame = {
          state: {},
          params: {
            iorDispersion: 38,
            frost: 0,
            centerHandle: { x: 50, y: 50, radius: 8.15999984741211, angle: 45 },
            amount: 50,
            patternType: 2,
            seamlessness: 0,
            pixelWrapMode: 3,
          },
          input: null,
          output: null,
        };
        setup(device, frame);

        const draw = () => {
          if (disposed) return;
          const width = Math.max(1, Math.round(container.clientWidth));
          const height = Math.max(1, Math.round(container.clientHeight));
          canvas.width = width;
          canvas.height = height;
          const source = document.createElement("canvas");
          source.width = width;
          source.height = height;
          const painter = source.getContext("2d");
          if (!painter) return;
          const scale = Math.max(width / image.width, height / image.height);
          painter.drawImage(
            image,
            (width - image.width * scale) / 2,
            (height - image.height * scale) / 2,
            image.width * scale,
            image.height * scale,
          );
          texture?.destroy();
          // GPUTextureUsage: COPY_DST | TEXTURE_BINDING | RENDER_ATTACHMENT.
          texture = device.createTexture({
            size: [width, height],
            format: "rgba8unorm",
            usage: 2 | 4 | 16,
          });
          device.queue.copyExternalImageToTexture(
            { source },
            { texture },
            [width, height],
          );
          frame.input = texture;
          frame.output = context.getCurrentTexture();
          render(device, frame);
          setStatus("ready");
        };

        device.pushErrorScope("validation");
        draw();
        const validationError = await device.popErrorScope();
        if (validationError) throw new Error(validationError.message);
        observer = new ResizeObserver(draw);
        observer.observe(container);
        device.lost.then(() => {
          if (!disposed) setStatus("unavailable");
        });
      } catch (error) {
        if (!disposed) {
          setStatus("unavailable");
          console.warn("Figma footer shader unavailable; showing its source image.", error);
        }
      }
    }

    void initialize();
    return () => {
      disposed = true;
      observer?.disconnect();
      texture?.destroy();
      frame?.state?.uniformBuf?.destroy();
      frame?.state?.quad?.destroy();
      device?.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ overflow: "hidden", borderRadius: "23px 23px 0 0", ...style }}
      data-effect-status={status}
    >
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={{ opacity: status === "ready" ? 1 : 0 }}
      />
    </div>
  );
}
