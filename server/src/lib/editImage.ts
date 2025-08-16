import sharp from "sharp";

export default async function editImage(
  userImage: Express.Multer.File,
  name: string
) {
  const size = 230; // circle size
  const shadowBlur = 12.3596;
  const borderWidth = 8;
  const borderColor = "#23B133";
  const shadowPadding = 32; // extra space for blur
  const fontSize = 32;
  const textColor = "#FFFFFF";
  const textPadding = 20;
  const maxTextWidth = size + shadowPadding * 2;

  // 1. Create circular mask
  const circleMaskSvg = `
    <svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white" />
    </svg>
  `;
  const circleMask = Buffer.from(circleMaskSvg);

  // 2. Main circular image
  const mainCircle = await sharp(userImage.buffer)
    .resize(size, size)
    .composite([{ input: circleMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  // 3. Shadow
  const shadowCircleSvg = `
    <svg width="${size + shadowPadding * 2}" height="${size + shadowPadding * 2}">
      <circle cx="${size / 2 + shadowPadding}" cy="${size / 2 + shadowPadding}" r="${size / 2}" fill="black" />
    </svg>
  `;
  const shadowCircle = Buffer.from(shadowCircleSvg);

  const shadow = await sharp(shadowCircle)
    .blur(shadowBlur / 2)
    .modulate({ brightness: 0.2 })
    .png()
    .toBuffer();

  // 4. Border
  const borderCircleSvg = `
    <svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - borderWidth / 2}"
        fill="none" stroke="${borderColor}" stroke-width="${borderWidth}" />
    </svg>
  `;
  const borderCircle = Buffer.from(borderCircleSvg);

  // 4. Create dynamic text SVG (using <tspan> for wrapping)
  const words = name.split(" ");
  const lineHeight = fontSize * 1.2;
  let lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length * (fontSize * 0.6) > maxTextWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  const textHeight = lines.length * lineHeight + textPadding;
  const totalHeight = size + shadowPadding * 2 + textHeight;

  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="50%" dy="${i === 0 ? 0 : lineHeight}">${line}</tspan>`
    )
    .join("");

  const textSvg = `
    <svg width="${maxTextWidth}" height="${textHeight + 10}">
      <text x="50%" y="${fontSize}" font-family="Arial" font-size="${fontSize}" font-weight="bold"
        fill="${textColor}" text-anchor="middle" dominant-baseline="hanging">
        ${tspans}
      </text>
    </svg>`;
  const textBuffer = Buffer.from(textSvg);

  // 6. Final canvas (circle + shadow + border + text)
  const finalImage = await sharp({
    create: {
      width: size + shadowPadding * 2,
      height: Math.round(totalHeight) + 10, // extra height for text
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: shadow, top: 6, left: 0 },
      { input: mainCircle, top: shadowPadding, left: shadowPadding },
      { input: borderCircle, top: shadowPadding, left: shadowPadding },
      { input: textBuffer, top: size + shadowPadding * 2 - 35, left: 0 },
    ])
    .png()
    .toBuffer();

  return finalImage;
}
