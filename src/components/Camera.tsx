import * as React from 'react';
import Wrapper from './P5Wrapper';
import p5 from 'p5';
import Alters, { Alter, AlterBuilder, Capture } from '../services/Alters';
import Draggable from './Draggable';

const width = 300;
const height = 200;
let capture: p5.Element;
let alter: Alter;

const sketch = (alterBuilder: AlterBuilder) => (sketch: p5) => {
  sketch.setup = () => {
    sketch.createCanvas(width, height);

    capture = sketch.createCapture(sketch.VIDEO);

    alter = alterBuilder(sketch, (capture as unknown) as Capture);
    alter.setup();
    capture.hide();
  };

  sketch.draw = () => {
    if (alter) {
      alter.draw();
    }
  };
};

const realSketch = sketch(Alters.matrix);

const Camera: React.FC<React.ComponentProps<'div'>> = () => {
  const [visible, setVisible] = React.useState(true);

  return (
    <Draggable style={{ width: `${width}px` }}>
      <div className='camera-bar'>
        <span
          className={visible ? 'expand-button' : 'expand-button active'}
          onMouseDown={(e) => {
            e.stopPropagation();
            setVisible(!visible);
          }}
        />
        {` Camera`}
      </div>
      <Wrapper
        sketch={realSketch}
        style={{ visibility: visible ? 'visible' : 'hidden' }}
      />
    </Draggable>
  );
};

export default Camera;
