import * as React from 'react';

type Pos = { x: number; y: number };
interface Props extends React.ComponentProps<'div'> {
  initialPos?: Pos;
}
const Draggable: React.FC<Props> = ({
  children,
  initialPos = { x: 0, y: 0 },
  style,
  ...props
}) => {
  const [dragging, setDragging] = React.useState(false);
  const [relativePos, setRelativePos] = React.useState<Pos>(null);
  const [pos, setPos] = React.useState(initialPos);
  const domNode = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleMouseMouve = (e: MouseEvent) => {
      if (!dragging) {
        return;
      }
      setPos({
        x: e.pageX - relativePos.x,
        y: e.pageY - relativePos.y,
      });
      e.stopPropagation();
      e.preventDefault();
    };

    const handleMouseUp = (e: MouseEvent) => {
      setDragging(false);
      e.stopPropagation();
      e.preventDefault();
    };

    document.addEventListener('mousemove', handleMouseMouve);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMouve);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, relativePos]);

  return (
    <div
      ref={domNode}
      style={{
        position: 'absolute',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        ...style,
      }}
      onMouseDown={(e) => {
        if (e.button !== 0) {
          return;
        }

        setDragging(true);
        setRelativePos({
          x: e.pageX - domNode.current.offsetLeft,
          y: e.pageY - domNode.current.offsetTop,
        });

        e.stopPropagation();
        e.preventDefault();
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Draggable;
