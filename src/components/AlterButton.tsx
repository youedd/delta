import * as React from 'react';

import Alters, { AlterBuilder } from '../services/Alters';
import Pannel from './Pannel';

interface Props {
  onAlterChange: (builder: AlterBuilder) => void;
}
const AlterButton: React.FC<Props> = ({ onAlterChange }) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <button onClick={() => setVisible(true)}> Alters</button>
      {visible && (
        <Pannel
          width={300}
          title='Alters'
          closable
          onRequestClose={() => setVisible(false)}
        >
          {Object.values(Alters).map((builder, index) => {
            return (
              <p
                className='alter-row'
                key={index}
                title={builder.info.description}
                onClick={() => {
                  onAlterChange(builder);
                }}
              >
                {builder.info.name}
              </p>
            );
          })}
        </Pannel>
      )}
    </>
  );
};

export default AlterButton;
