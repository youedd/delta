import PeerJS from 'peerjs';
import Logger from './Logger';

export type Message = { type: 'connect'; id: string };

export type Peer = PeerJS;

export const init = (
  onReady?: (id: string, call: (peerId: string) => void) => void,
) => {
  const _peer = new PeerJS(undefined, {
    port: 3001,
    host: 'localhost',
  });

  _peer.on('open', (id) => {
    onReady(id, call);
  });

  _peer.on('call', (call) => {
    const output = document.getElementById('output') as HTMLCanvasElement;
    // Answer the call with an A/V stream.
    call.answer(output.captureStream(25));
    _initCall(call);
  });

  const _initCall = (call: PeerJS.MediaConnection) => {
    const input = document.getElementById('input') as HTMLVideoElement;
    call.on('stream', (remoteStream) => {
      input.srcObject = remoteStream;
      input.play().catch(Logger.error);
    });
  };

  const call = (peerId: string) => {
    if (peerId) {
      const canvas = document.querySelector('canvas');
      const stream = canvas.captureStream();
      //make the call
      const call = _peer.call(peerId, stream);
      _initCall(call);
    }
  };
};
