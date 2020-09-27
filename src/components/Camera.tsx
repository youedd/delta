import * as React from 'react';
import Wrapper from './P5Wrapper';
import p5 from 'p5';
import { Alter, AlterBuilder } from '../services/Alters';
import Pannel from './Pannel';

const createSketch = (
  alterBuilder: AlterBuilder,
  output: HTMLCanvasElement,
  camera: HTMLCanvasElement,
) => (sketch: p5) => {
  let alter: Alter;
  let renderer: p5.Renderer;

  const drawOutput = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    context.drawImage(renderer.elt, 0, 0, canvas.width, canvas.height);
  };

  sketch.setup = () => {
    sketch.noCanvas();
    alter = alterBuilder.build(sketch);
    alter.renderer.hide();
    renderer = alter.renderer;
  };

  sketch.draw = () => {
    if (alter) {
      alter.draw();
    }
    drawOutput(output);
    drawOutput(camera);
  };
};

interface Props extends React.ComponentProps<'div'> {
  alter: AlterBuilder;
}
const Camera: React.FC<Props> = ({ alter }) => {
  const output = React.useRef<HTMLCanvasElement>();
  const camera = React.useRef<HTMLCanvasElement>();

  const [sketch, setSketch] = React.useState<(sketch: p5) => void>();

  React.useEffect(() => {
    setSketch(() => createSketch(alter, output.current, camera.current));
  }, [alter]);

  return (
    <>
      <canvas
        ref={output}
        id='output'
        style={{ display: 'none' }}
        width={800}
        height={600}
      />
      <Pannel expendable width={400} title='Camera'>
        <canvas
          ref={camera}
          width={400}
          height={300}
          style={{ backgroundColor: 'black' }}
        />
      </Pannel>
      {sketch ? <Wrapper sketch={sketch} /> : null}{' '}
    </>
  );
};

export default Camera;
