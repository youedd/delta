import p5 from 'p5';

export type Capture = {
  size: (width: number, height: number) => void;
  loadPixels: () => void;
  height: number;
  width: number;
  pixels: number[];
};

export type Alter = {
  setup: () => void;
  draw: () => void;
};

export type AlterBuilder = {
  info: {
    name: string;
    description: string;
  };
  build: (sketch: p5, capture: Capture) => Alter;
};
