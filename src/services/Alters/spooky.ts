import { AlterBuilder } from './types';

const spooky: AlterBuilder = {
  info: {
    name: 'Spooky 👻',
    description: 'booooooo',
  },
  build: (sketch) => {
    const renderer = sketch.createGraphics(800, 600);
    const capture = sketch.createCapture(sketch.VIDEO);

    capture.size(300, 200);
    capture.hide();

    renderer.translate(renderer.width, 0); // move to far corner
    renderer.scale(-1.0, 1.0); // flip x-axis backwards

    return {
      renderer,

      draw: () => {
        renderer.image(capture, 0, 0, 800, 600);
        renderer.filter(renderer.INVERT);
      },
    };
  },
};

export default spooky;
