import { AlterBuilder } from './types';

const mosaic: AlterBuilder = {
  info: {
    name: 'Matrix Mode 😎',
    description: 'Say Hi to your friends from the matrix 👋',
  },
  build: (sketch, capture) => {
    const cols = 60;
    const rows = 40;
    const scale = sketch.min(sketch.width / cols, sketch.height / rows);
    return {
      setup: () => {
        capture.size(cols, rows);
        sketch.noStroke();
        sketch.textSize(scale);
      },

      draw: () => {
        sketch.background(0, 0, 0);
        capture.loadPixels();

        for (let y = 0; y < capture.height; y++) {
          for (let x = 0; x < capture.width; x++) {
            const index = (capture.width - x + 1 + y * capture.width) * 4;
            const r = capture.pixels[index + 0];
            const g = capture.pixels[index + 1];
            const b = capture.pixels[index + 2];
            const bright = (r + g + b) / 3;
            sketch.fill(0, 255, 0, bright);
            sketch.text(
              sketch.random() < 0.5 ? '0' : '1',
              x * scale,
              y * scale,
            );
          }
        }
      },
    };
  },
};

export default mosaic;
