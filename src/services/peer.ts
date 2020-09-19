import PeerJS from 'peerjs';

export type Message = { type: 'connect'; id: string };

export type Peer = PeerJS;

export const Peer = () => {
  const _peer = new PeerJS(undefined, {
    port: 3001,
    host: 'localhost',
  });

  return _peer;
};
