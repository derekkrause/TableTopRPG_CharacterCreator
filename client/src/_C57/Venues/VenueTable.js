import React from "react";
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import Venue from "./Venue";

class VenueTable extends React.Component {
  render() {
    return (
      <div>
        {/* <div className="app-wrapper"> */}
        {/* <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="pages.samplePage" />}
        /> */}
        <div>
          {this.props.venueList &&
            this.props.venueList.map((venue, index) => <Venue venue={venue} key={index} toggle={this.props.toggle} />)}
        </div>
      </div>
    );
  }
}

export default VenueTable;
