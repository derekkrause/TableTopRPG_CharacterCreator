import React from "react";

class FeatureList extends React.Component {
  render() {
    return (
      <div
        className="container-fluid mx-0 px-0"
        // style={{ backgroundColor: "gray", color: "white" }}
      >
        <img
          className="img-fluid"
          style={{ backgroundSize: "cover" }}
          src="https://sabio-training.s3.us-west-2.amazonaws.com/C57/Capture.PNG"
        />
      </div>
    );
  }
}

export default FeatureList;
