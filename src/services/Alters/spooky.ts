import { AlterBuilder } from './types';

const spooky: AlterBuilder = {
  info: {
    name: 'Spooky 👻',
    description: 'booooooo',
  },
  build: (sketch, capture) => {
    return {
      setup: () => {
        capture.size(300, 200);
      },

      draw: () => {
        sketch.translate(sketch.width, 0); // move to far corner
        sketch.scale(-1.0, 1.0); // flip x-axis backwards

        sketch.image(capture, 0, 0);
        sketch.filter(sketch.INVERT);
      },
    };
  },
};

export default spooky;
