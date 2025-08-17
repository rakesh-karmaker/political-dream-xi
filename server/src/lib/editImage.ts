import sharp from "sharp";

// Caches for SVG assets keyed by size
const maskCache = new Map<number, Buffer>();
const borderCache = new Map<number, Buffer>();
const shadowCache = new Map<string, Buffer>(); // key includes size+padding

function getCircleMask(size: number) {
  const cached = maskCache.get(size);
  if (cached) return cached;
  const svg = `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`;
  const buf = Buffer.from(svg);
  maskCache.set(size, buf);
  return buf;
}

function getBorderCircle(
  size: number,
  borderWidth: number,
  borderColor: string
) {
  const key = `${size}-${borderWidth}-${borderColor}`;
  const cached = borderCache.get(size);
  if (cached) return cached;
  const svg = `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - borderWidth / 2}" fill="none" stroke="${borderColor}" stroke-width="${borderWidth}"/></svg>`;
  const buf = Buffer.from(svg);
  borderCache.set(size, buf);
  return buf;
}

function getShadow(size: number, shadowPadding: number, shadowBlur: number) {
  const key = `${size}-${shadowPadding}-${shadowBlur}`;
  const cached = shadowCache.get(key);
  if (cached) return cached;
  const canvas = size + shadowPadding * 2;
  const cx = size / 2 + shadowPadding;
  const cy = size / 2 + shadowPadding;
  const svg = `<svg width="${canvas}" height="${canvas}"><circle cx="${cx}" cy="${cy}" r="${size / 2}" fill="black"/></svg>`;
  const buf = Buffer.from(svg);
  shadowCache.set(key, buf);
  return buf;
}

export default async function editImage(
  userImage: Express.Multer.File,
  name: string,
  options?: { size?: number; borderColor?: string; extraTextWidth?: number }
) {
  const size = options?.size ?? 250;
  const shadowBlur = Math.min(10, 12.3596); // cap expensive blur
  const borderWidth = 8;
  const borderColor = options?.borderColor ?? "#23B133";
  const shadowPadding = Math.min(24, Math.round(size * 0.15));
  const fontSize = Math.max(43, Math.round(size * 0.12));
  const textColor = "#FFFFFF";
  const textPadding = 20;
  const extraTextWidth = options?.extraTextWidth ?? 120; // increase this for more text width

  const baseWidth = size + shadowPadding * 2;
  const maxTextWidth = baseWidth + extraTextWidth;

  // Prepare reusable SVG buffers
  const circleMask = getCircleMask(size);
  const borderCircle = getBorderCircle(size, borderWidth, borderColor);
  const shadowSvg = getShadow(size, shadowPadding, shadowBlur);

  // 1. Resize source early (cheaper operations follow)
  const resized = await sharp(userImage.buffer)
    .resize(size, size, { fit: "cover" })
    .toBuffer();

  // 2. Create main circular image using mask
  const mainCircle = await sharp(resized)
    .composite([{ input: circleMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  // 3. Create blurred shadow from larger SVG on a single pass
  const shadow = await sharp(shadowSvg).blur(shadowBlur).png().toBuffer();

  // 4. Dynamic text layout (simple wrap by chars; avoids heavy measuring)
  const words = (name || "").split(" ");
  const avgCharWidth = fontSize * 0.6;
  const maxCharsPerLine = Math.max(6, Math.floor(maxTextWidth / avgCharWidth));
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxCharsPerLine) {
      if (cur) lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur.trim());

  const lineHeight = fontSize * 1.4;
  const textHeight = lines.length * lineHeight + textPadding;
  const totalHeight = size + shadowPadding * 2 + textHeight;

  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="50%" dy="${i === 0 ? 0 : lineHeight}">${line}</tspan>`
    )
    .join("");

  const textSvg = `<svg width="${maxTextWidth}" height="${textHeight + 10}"><text x="50%" y="${fontSize}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="600" fill="${textColor}" text-anchor="middle" dominant-baseline="hanging">${tspans}</text></svg>`;
  const textBuffer = Buffer.from(textSvg);

  // 5. Composite final image: shadow (larger canvas) + circle + border + text
  const canvasWidth = baseWidth + extraTextWidth;
  const canvasHeight = Math.round(totalHeight) + 10;
  // Center circle and shadow in the wider canvas
  const offsetX = Math.floor((canvasWidth - baseWidth) / 2);

  const composed = await sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: shadow, top: 6, left: offsetX },
      { input: mainCircle, top: shadowPadding, left: offsetX + shadowPadding },
      {
        input: borderCircle,
        top: shadowPadding,
        left: offsetX + shadowPadding,
      },
      { input: textBuffer, top: size + shadowPadding * 2 - 20, left: 0 },
    ])
    .webp({ quality: 80 })
    .toBuffer();

  return composed;
}
