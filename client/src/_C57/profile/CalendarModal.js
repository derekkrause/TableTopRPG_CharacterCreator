import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { withGoogleMap, GoogleMap } from "react-google-maps";
import { Link, withRouter } from "react-router-dom";

class CalendarModal extends Component {
  state = {};

  render() {
    const SimpleMapGoogleMap = withGoogleMap(props => (
      <GoogleMap defaultZoom={15} defaultCenter={{ lat: this.props.lat, lng: this.props.long }} />
    ));

    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.toggle}
        className={this.props.className}
        onBlur={this.props.toggle}
      >
        <ModalHeader toggle={this.toggle}>
          <h2>
            <b>{this.props.name}</b>
          </h2>
          <h4 className="float-right">{new Date(this.props.startDate).toDateString()}</h4>
        </ModalHeader>
        <ModalBody>
          {this.props.logo && (
            <div className="row">
              <div className="col-md-4">
                <img
                  className="card-img-top"
                  // src="http://via.placeholder.com/500x330"
                  src={this.props.logo}
                  alt="Card image cap"
                />
              </div>
              <div className="col-md-8">
                {/* <p className="h4 text-muted">{this.props.shortName}</p> */}
                <h3 className="mb-3">Organized by {this.props.organizer}</h3>

                {/* <p className="h4 text-muted">Event Type: {this.props.eventTypeItem.name}</p> */}
                <p className="h4 text-muted">
                  <a href={this.props.websiteUrl} target="_blank">
                    {this.props.websiteUrl}
                  </a>
                </p>
                <h3>Start:&nbsp; {new Date(this.props.startDate).toDateString()}</h3>
                <h3>End:&nbsp; {new Date(this.props.endDate).toDateString()}</h3>
              </div>
            </div>
          )}
          {!this.props.logo && (
            <div className="row">
              <div className="col-md-12">
                <h3 className="mb-3">Organized by {this.props.organizer}</h3>
                {/* <p className="h4 text-muted">{this.props.shortName}</p> */}
                {/* <p className="h4 text-muted">Event Type: {this.props.eventTypeItem.name}</p> */}
                <p className="h4 text-muted">
                  <a href={this.props.websiteUrl} target="_blank">
                    {this.props.websiteUrl}
                  </a>
                </p>
                <h3>Start:&nbsp; {new Date(this.props.startDate).toDateString()}</h3>
                <h3>End:&nbsp; {new Date(this.props.endDate).toDateString()}</h3>
              </div>
            </div>
          )}
          <hr />
          <div className="row justify-content-center">
            <div className="col-md-12">
              {/* <h5 className="card-title my-2">Description</h5> */}
              <h3 className="">{this.props.description}</h3>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-4">
              <h3>Location:</h3>

              {this.props.suite ? (
                <h4>
                  {this.props.street}, Suite {this.props.suite}
                </h4>
              ) : (
                <h4>{this.props.street}</h4>
              )}

              <h4>
                {this.props.city}, {this.props.state} {this.props.zip}
              </h4>
            </div>
            <div className="col-md-8">
              <SimpleMapGoogleMap
                containerElement={<div className={`embed-responsive embed-responsive-21by9`} />}
                mapElement={<div className="embed-responsive-item" />}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Link to={`/app/events/${this.props.eventId}`}>
            <Button color="link">Go To Event Page</Button>
          </Link>
        </ModalFooter>
      </Modal>
    );
  }
}

export default withRouter(CalendarModal);
