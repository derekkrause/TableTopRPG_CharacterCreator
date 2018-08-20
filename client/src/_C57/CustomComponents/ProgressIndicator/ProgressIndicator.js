import React, { Component } from "react";

/*
ProgressIndicator Component

How to use

1. Import the ProgressIndicator component.
2. Add the component <ProgressIndicator /> anywhere in the render return <div>. Works similar to SweetAlerts.
3. It will need a prop of "loader" to be set in state and passed as the prop.  Component in render return will look like:
    <ProgressIndicator loader={this.state.pLoader} />

4. To use, set the state to true to show, false to not show, i.e. this.setState({pLoader: true})
5. Use where needed in the code, to indicate ongoing activity.
*/

class ProgressIndicator extends Component {
  circularProgress = () => (
    <div className="loader">
      <svg className="circular" viewBox="25 25 50 50">
        <circle className="path" cx="50" cy="50" r="15" fill="none" strokeWidth="2" strokeMiterlimit="10" />
      </svg>
    </div>
  );

  render() {
    const { loader } = this.props;

    const progress = this.circularProgress();

    return <div className="loader-view">{loader && progress}</div>;
  }
}

export default ProgressIndicator;
