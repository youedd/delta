import * as React from 'react';
import { hot } from 'react-hot-loader';

import './../assets/scss/App.scss';
import Camera from './Camera';
import * as Peer from '../services/peer';
import AlterButton from './AlterButton';
import { AlterBuilder } from '../services/Alters';
import matrix from '../services/Alters/matrix';
import Logger from '../services/Logger';

declare global {
  interface HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream;
  }
}

const App: React.FC = () => {
  const [id, setId] = React.useState<string>();
  const [alter, setAlter] = React.useState<AlterBuilder>(matrix);
  const video = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const href = window.location.href;
    const peerId = href.replace(/^[^#]*#?/g, '');

    Peer.init((id, call) => {
      setId(id);
      if (peerId) {
        call(peerId);
      }
    });
  }, []);

  return (
    <div className='app'>
      <video id='input' ref={video} width={800} height={600} />
      <Camera alter={alter} />
      <button
        onClick={() => {
          const getUrl = window.location;
          const url = getUrl.protocol + '//' + getUrl.host + '/#' + id;
          Logger.log(url);
          navigator.clipboard.writeText(url).then(
            () => alert(`Copy ${url} to clipboard`),
            () => alert(url),
          );
        }}
      >
        copy invite link
      </button>
      <AlterButton onAlterChange={(alter) => setAlter(alter)} />
    </div>
  );
};

declare let module: Record<string, unknown>;

export default hot(module)(App);
