import { AlterBuilder } from './types';

const spooky: AlterBuilder = {
  info: {
    name: 'Spooky 👻',
    description: 'booooooo',
  },
  build: (sketch) => {
    const renderer = sketch.createCanvas(800, 600);
    const capture = sketch.createCapture(sketch.VIDEO);

    capture.size(300, 200);

    renderer.hide();
    capture.hide();

    return {
      renderer,

      draw: () => {
        sketch.translate(sketch.width, 0); // move to far corner
        sketch.scale(-1.0, 1.0); // flip x-axis backwards

        sketch.image(capture, 0, 0, 800, 600);
        sketch.filter(sketch.INVERT);
      },
    };
  },
};

export default spooky;
