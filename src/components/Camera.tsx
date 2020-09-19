import * as React from 'react';
import Wrapper from './P5Wrapper';
import p5 from 'p5';
import { Alter, AlterBuilder, Capture } from '../services/Alters';
import Pannel from './Pannel';

const width = 300;
const height = 200;
const createSketch = (alterBuilder: AlterBuilder) => (sketch: p5) => {
  let capture: p5.Element;
  let alter: Alter;

  sketch.setup = () => {
    sketch.createCanvas(width, height);

    capture = sketch.createCapture(sketch.VIDEO);

    alter = alterBuilder.build(sketch, (capture as unknown) as Capture);
    alter.setup();
    capture.hide();
  };

  sketch.draw = () => {
    if (alter) {
      alter.draw();
    }
  };
};

interface Props extends React.ComponentProps<'div'> {
  alter: AlterBuilder;
}
const Camera: React.FC<Props> = ({ alter }) => {
  const [sketch, setSketch] = React.useState<(sketch: p5) => void>();
  React.useEffect(() => {
    setSketch(() => createSketch(alter));
  }, [alter]);

  return sketch ? (
    <Pannel expendable width={300} title='Camera'>
      <Wrapper key={alter.info.name} sketch={sketch} />
    </Pannel>
  ) : null;
};

export default Camera;
