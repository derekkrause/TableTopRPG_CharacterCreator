import React, { Component } from "react";
import "./App.css";
import { getDotNet, getNode } from "./server";

function mark(str) {
  const start = str + "start";
  performance.mark(start);
  const end = str + "end";
  performance.mark(end);
  performance.measure(str, start, end);
}

class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const x = 123;

    if (x == 123) {
      console.log("hey");
    }

    const promises = Promise.all([getDotNet(), getNode()]);
    promises.then(([dotNetResponse, nodeResponse]) => {
      mark("then callback");
      this.setState(
        {
          dotNetResponse,
          nodeResponse,
          loading: false
        },
        () => {
          mark("after set state");
        }
      );
    });
    mark("after promises.then");
  }

  render() {
    const { loading, dotNetResponse, nodeResponse } = this.state;

    return (
      <div className="App">
        <div>
          <h1>Response from .NET</h1>
          <pre>
            {loading ? "Loading..." : JSON.stringify(dotNetResponse, null, 3)}
          </pre>
        </div>
        <div>
          <h1>Response from Node.js</h1>
          <pre>
            {loading ? "Loading..." : JSON.stringify(nodeResponse, null, 3)}
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
