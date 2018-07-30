import React, { Component } from "react";

import CardBox from "../../components/CardBox";
import TextFields from "./TextFields";
import RadioButtonsGroup from "./RadioButtonsGroup";

class EventTypeListView extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Event Type List will be here...</h1>
        <div className="row mb-md-4">
          <CardBox styleName="col-lg-12">
            <TextFields />
          </CardBox>
        </div>
        <div className="row mb-md-4">
          <CardBox styleName="col-lg-6">
            <RadioButtonsGroup />
          </CardBox>
        </div>
      </div>
    );
  }
}

export default EventTypeListView;
