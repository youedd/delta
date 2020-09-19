import * as React from 'react';
import Draggable from './Draggable';

interface Props {
  title: string;
  width: number;
  expendable?: boolean;
  closable?: boolean;
  onRequestClose?: () => void;
  onRequestExpend?: (isVisible: boolean) => void;
}

const Pannel: React.FC<Props> = ({
  width,
  title,
  expendable,
  closable,
  onRequestClose,
  children,
}) => {
  const [visible, setVisible] = React.useState(true);

  return (
    <Draggable style={{ width: `${width}px` }}>
      <div className='camera-bar'>
        {closable && (
          <span
            className={'button close-button'}
            onMouseDown={(e) => {
              e.stopPropagation();
              if (onRequestClose) {
                onRequestClose();
              }
            }}
          />
        )}
        {expendable && (
          <span
            className={
              visible ? 'button expand-button' : 'button expand-button active'
            }
            onMouseDown={(e) => {
              e.stopPropagation();
              setVisible(!visible);
            }}
          />
        )}
        {` ${title}`}
      </div>
      <div style={{ visibility: visible ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </Draggable>
  );
};

export default Pannel;
