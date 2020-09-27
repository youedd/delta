import p5 from 'p5';
import { AlterBuilder } from './types';

const matrix: AlterBuilder = {
  info: {
    name: 'Mosaic',
    description:
      'If you have been in japan, you can say your face is censured!',
  },
  build: (sketch) => {
    const renderer = sketch.createGraphics(800, 600);
    const capture = sketch.createCapture(sketch.VIDEO) as p5.Element & p5.Image;

    const cols = 40;
    const rows = 30;
    const scale = sketch.min(renderer.width / cols, renderer.height / rows);

    capture.size(cols, rows);
    capture.hide();

    renderer.noStroke();

    return {
      renderer,
      draw: () => {
        capture.loadPixels();

        for (let y = 0; y < capture.height; y++) {
          for (let x = 0; x < capture.width; x++) {
            const index = (capture.width - x + 1 + y * capture.width) * 4;
            const r = capture.pixels[index + 0];
            const g = capture.pixels[index + 1];
            const b = capture.pixels[index + 2];

            renderer.fill(r, g, b);
            renderer.rect(x * scale, y * scale, scale, scale);
          }
        }
      },
    };
  },
};

export default matrix;
