import p5 from 'p5';

export type Alter = {
  renderer: p5.Renderer;
  draw: () => void;
};

export type AlterBuilder = {
  info: {
    name: string;
    description: string;
  };
  build: (sketch: p5) => Alter;
};
