import { AlterBuilder } from './types';

const matrix: AlterBuilder = {
  info: {
    name: 'Mosaic',
    description:
      'If you have been in japan, you can say your face is censured!',
  },
  build: (sketch, capture) => {
    const cols = 30;
    const rows = 20;
    const scale = sketch.min(sketch.width / cols, sketch.height / rows);
    return {
      setup: () => {
        capture.size(cols, rows);
        sketch.noStroke();
        sketch.textSize(scale);
      },

      draw: () => {
        capture.loadPixels();

        for (let y = 0; y < capture.height; y++) {
          for (let x = 0; x < capture.width; x++) {
            const index = (capture.width - x + 1 + y * capture.width) * 4;
            const r = capture.pixels[index + 0];
            const g = capture.pixels[index + 1];
            const b = capture.pixels[index + 2];

            sketch.fill(r, g, b);
            sketch.rect(x * scale, y * scale, scale, scale);
          }
        }
      },
    };
  },
};

export default matrix;
