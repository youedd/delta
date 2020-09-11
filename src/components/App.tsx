import * as React from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";

// eslint-disable-next-line
const reactLogo: string = require("./../assets/img/react_logo.svg").default;
class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <div className="app">
        <h1>Hello World!</h1>
        <p>Foo to the barz</p>
        <img src={reactLogo} height="480" />
      </div>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
