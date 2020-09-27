import * as React from 'react';
import p5 from 'p5';

interface Props extends React.ComponentProps<'div'> {
  sketch: (sketch: p5) => void;
}

const P5Wrapper: React.FC<Props> = ({ sketch, ...props }) => {
  const wrapper = React.useRef<HTMLDivElement>();
  const instance = React.useRef<p5>();

  React.useEffect(() => {
    const container = wrapper.current;
    if (sketch && container) {
      if (container.childNodes[0]) {
        container.removeChild(container.childNodes[0]);
      }
      instance.current = new p5(sketch, container);
    }
    return () => {
      instance.current.remove();
    };
  }, [sketch]);
  return <div ref={wrapper} {...props} />;
};

export default React.memo(P5Wrapper);
