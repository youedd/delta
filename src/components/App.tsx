import * as React from 'react';
import { hot } from 'react-hot-loader';

import './../assets/scss/App.scss';
import Camera from './Camera';

const App: React.FC = () => {
  return (
    <div className='app'>
      <Camera />
    </div>
  );
};

declare let module: Record<string, unknown>;

export default hot(module)(App);
