import p5 from 'p5';
import { AlterBuilder } from './types';

const mosaic: AlterBuilder = {
  info: {
    name: 'Matrix Mode 😎',
    description: 'Say Hi to your friends from the matrix 👋',
  },

  build: (sketch) => {
    const renderer = sketch.createGraphics(800, 600);
    const capture = sketch.createCapture(sketch.VIDEO) as p5.Element & p5.Image;
    const cols = 40;
    const rows = 30;

    capture.size(cols, rows);

    const scale = sketch.min(renderer.width / cols, renderer.height / rows);

    renderer.noStroke();
    renderer.textSize(scale);

    capture.hide();

    return {
      renderer,
      draw: () => {
        renderer.background(0, 0, 0);
        capture.loadPixels();

        for (let y = 0; y < capture.height; y++) {
          for (let x = 0; x < capture.width; x++) {
            const index = (capture.width - x + 1 + y * capture.width) * 4;
            const r = capture.pixels[index + 0];
            const g = capture.pixels[index + 1];
            const b = capture.pixels[index + 2];
            const bright = (r + g + b) / 3;
            renderer.fill(0, 255, 0, bright);
            renderer.text(
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
