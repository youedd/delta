import * as React from 'react';
import { hot } from 'react-hot-loader';

import './../assets/scss/App.scss';
import Camera from './Camera';
import { Peer } from '../services/peer';
import AlterButton from './AlterButton';
import { AlterBuilder } from '../services/Alters';
import matrix from '../services/Alters/matrix';
import Logger from '../services/Logger';

declare global {
  interface HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream;
  }
}

let peer: Peer;
const App: React.FC = () => {
  const [id, setId] = React.useState<string>();
  const [alter, setAlter] = React.useState<AlterBuilder>(matrix);
  const video = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const href = window.location.href;
    const peerId = href.replace(/^[^#]*#?/g, '');
    peer = Peer();
    peer.on('open', (id) => {
      setId(id);

      if (peerId) {
        const canvas = document.querySelector('canvas');
        const stream = canvas.captureStream();
        const call = peer.call(peerId, stream);
        call.on('stream', function (remoteStream) {
          Logger.log('responded');
          video.current.srcObject = remoteStream;
          video.current.play().catch(Logger.error);
        });
      }

      peer.on('call', (call) => {
        const canvas = document.querySelector('canvas');
        const stream = canvas.captureStream(25);
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', (remoteStream) => {
          Logger.log('called');
          video.current.srcObject = remoteStream;
          video.current.play().catch(Logger.error);
        });
      });
    });
  }, []);

  return (
    <div className='app'>
      <video id='vido' ref={video} width={1000} height={1000} />
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
