export type PlayerPosition = {
  x: number;
  y: number;
  xOffset: number;
  yOffset: number;
};

export const playerPositions: Record<
  | "formation442"
  | "formation334"
  | "formation1144"
  | "formation1243"
  | "formation145"
  | "formation1234",
  PlayerPosition[]
> = {
  formation442: [
    {
      x: 28.77,
      xOffset: 0,
      y: 78.5,
      yOffset: 0,
    },
    {
      x: 54.5,
      xOffset: 0,
      y: 78.5,
      yOffset: 0,
    },
    {
      x: 13,
      xOffset: 0,
      y: 61.25,
      yOffset: 7,
    },
    {
      x: 32,
      xOffset: 0,
      y: 61.25,
      yOffset: 7,
    },
    {
      x: 52,
      xOffset: 5,
      y: 61.25,
      yOffset: 7,
    },
    {
      x: 71,
      xOffset: 5,
      y: 61.25,
      yOffset: 7,
    },
    {
      x: 13,
      xOffset: 0,
      y: 43.5,
      yOffset: 0,
    },
    {
      x: 32,
      xOffset: 0,
      y: 43.5,
      yOffset: 0,
    },
    {
      x: 52,
      xOffset: 6,
      y: 43.5,
      yOffset: 0,
    },
    {
      x: 71,
      xOffset: 7,
      y: 43.5,
      yOffset: 0,
    },
    {
      x: 42,
      xOffset: 0,
      y: 26.5,
      yOffset: 19,
    },
    {
      x: 0,
      xOffset: 0,
      y: 6,
      yOffset: 0,
    },
  ],
  formation334: [
    {
      x: 21.75,
      xOffset: 0,
      y: 78.75,
      yOffset: 0,
    },
    {
      x: 42,
      xOffset: 0,
      y: 78.75,
      yOffset: 0,
    },
    {
      x: 61,
      xOffset: 0,
      y: 78.75,
      yOffset: 0,
    },
    {
      x: 21.75,
      xOffset: 0,
      y: 61.25,
      yOffset: 4,
    },
    {
      x: 42,
      xOffset: 0,
      y: 61.25,
      yOffset: 4,
    },
    {
      x: 61,
      xOffset: 0,
      y: 61.25,
      yOffset: 4,
    },
    {
      x: 13,
      xOffset: 0,
      y: 43.5,
      yOffset: 0,
    },
    {
      x: 32,
      xOffset: 0,
      y: 43.5,
      yOffset: 0,
    },
    {
      x: 52,
      xOffset: 6,
      y: 43.5,
      yOffset: 0,
    },
    {
      x: 71,
      xOffset: 7,
      y: 43.5,
      yOffset: 0,
    },
    {
      x: 42,
      xOffset: 0,
      y: 26.5,
      yOffset: 19,
    },
    {
      x: 0,
      xOffset: 0,
      y: 6,
      yOffset: 0,
    },
  ],
  formation1144: [
    {
      x: 41.85,
      xOffset: 0,
      y: 85,
      yOffset: 0,
    },
    {
      x: 41.85,
      xOffset: 0,
      y: 70.45,
      yOffset: 0,
    },
    {
      x: 12.85,
      xOffset: 0,
      y: 55.45,
      yOffset: 0,
    },
    {
      x: 31.85,
      xOffset: 0,
      y: 55.45,
      yOffset: 0,
    },
    {
      x: 51.85,
      xOffset: 0,
      y: 55.45,
      yOffset: 0,
    },
    {
      x: 70.85,
      xOffset: 0,
      y: 55.45,
      yOffset: 0,
    },
    {
      x: 12.85,
      xOffset: 0,
      y: 40.75,
      yOffset: 0,
    },
    {
      x: 31.85,
      xOffset: 0,
      y: 40.75,
      yOffset: 0,
    },
    {
      x: 51.85,
      xOffset: 0,
      y: 40.75,
      yOffset: 0,
    },
    {
      x: 70.85,
      xOffset: 0,
      y: 40.75,
      yOffset: 0,
    },
    {
      x: 42,
      xOffset: 0,
      y: 26.5,
      yOffset: 19,
    },
    {
      x: 0,
      xOffset: 0,
      y: 6,
      yOffset: 0,
    },
  ],
  formation1243: [
    {
      x: 42,
      xOffset: 0,
      y: 85,
      yOffset: 0,
    },
    {
      x: 32,
      xOffset: 0,
      y: 69.5,
      yOffset: 0,
    },
    {
      x: 52.15,
      xOffset: 0,
      y: 69.5,
      yOffset: 0,
    },
    {
      x: 13,
      xOffset: 0,
      y: 55.25,
      yOffset: 0,
    },
    {
      x: 32,
      xOffset: 0,
      y: 55.25,
      yOffset: 0,
    },
    {
      x: 52.15,
      xOffset: 0,
      y: 55.25,
      yOffset: 0,
    },
    {
      x: 71.25,
      xOffset: 0,
      y: 55.25,
      yOffset: 0,
    },
    {
      x: 21.5,
      xOffset: 0,
      y: 40.75,
      yOffset: 0,
    },
    {
      x: 42,
      xOffset: 0,
      y: 40.75,
      yOffset: 0,
    },
    {
      x: 60.75,
      xOffset: 0,
      y: 40.75,
      yOffset: 0,
    },
    {
      x: 42,
      xOffset: 0,
      y: 26.5,
      yOffset: 19,
    },
    {
      x: 0,
      xOffset: 0,
      y: 6,
      yOffset: 0,
    },
  ],
  formation145: [
    {
      x: 42,
      xOffset: 0,
      y: 85,
      yOffset: 22,
    },
    {
      x: 13,
      xOffset: 0,
      y: 69.25,
      yOffset: 0,
    },
    {
      x: 32,
      xOffset: 0,
      y: 64.75,
      yOffset: 0,
    },
    {
      x: 52.15,
      xOffset: 0,
      y: 64.75,
      yOffset: 0,
    },
    {
      x: 71.15,
      xOffset: 0,
      y: 69.25,
      yOffset: 0,
    },
    {
      x: 9.15,
      xOffset: 0,
      y: 49.75,
      yOffset: 0,
    },
    {
      x: 25.15,
      xOffset: 0,
      y: 44.75,
      yOffset: 0,
    },
    {
      x: 42,
      xOffset: 0,
      y: 41.25,
      yOffset: 0,
    },
    {
      x: 58.15,
      xOffset: 0,
      y: 44.75,
      yOffset: 0,
    },
    {
      x: 74.5,
      xOffset: 0,
      y: 49.75,
      yOffset: 0,
    },
    {
      x: 42,
      xOffset: 0,
      y: 26.5,
      yOffset: 19,
    },
    {
      x: 0,
      xOffset: 0,
      y: 6,
      yOffset: 0,
    },
  ],
  formation1234: [
    {
      x: 42,
      xOffset: 0,
      y: 85,
      yOffset: 0,
    },
    {
      x: 32,
      xOffset: 0,
      y: 69.5,
      yOffset: 0,
    },
    {
      x: 52.15,
      xOffset: 0,
      y: 69.5,
      yOffset: 0,
    },
    {
      x: 21.5,
      xOffset: 0,
      y: 55.25,
      yOffset: 0,
    },
    {
      x: 42,
      xOffset: 0,
      y: 55.25,
      yOffset: 0,
    },
    {
      x: 60.75,
      xOffset: 0,
      y: 55.25,
      yOffset: 0,
    },
    {
      x: 13,
      xOffset: 0,
      y: 40.75,
      yOffset: 0,
    },
    {
      x: 32,
      xOffset: 0,
      y: 40.75,
      yOffset: 0,
    },
    {
      x: 52.15,
      xOffset: 0,
      y: 40.75,
      yOffset: 0,
    },
    {
      x: 71.25,
      xOffset: 0,
      y: 40.75,
      yOffset: 0,
    },
    {
      x: 42,
      xOffset: 0,
      y: 26.5,
      yOffset: 19,
    },
    {
      x: 0,
      xOffset: 0,
      y: 6,
      yOffset: 0,
    },
  ],
};
