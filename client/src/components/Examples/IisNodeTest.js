import React from "react";
import { getDotNet, getNode } from "../../services/exampleService";

class IisNodeTest extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const promises = Promise.all([getDotNet(), getNode()]);
    promises.then(([dotNetResponse, nodeResponse]) => {
      this.setState({
        dotNetResponse,
        nodeResponse,
        loading: false
      });
    });
  }

  render() {
    const { loading, dotNetResponse, nodeResponse } = this.state;

    return (
      <div className="App">
        <div>
          <h1>Response from .NET</h1>
          <pre>{loading ? "Loading..." : JSON.stringify(dotNetResponse, null, 3)}</pre>
        </div>
        <div>
          <h1>Response from Node.js</h1>
          <pre>{loading ? "Loading..." : JSON.stringify(nodeResponse, null, 3)}</pre>
        </div>
      </div>
    );
  }
}

export default IisNodeTest;
