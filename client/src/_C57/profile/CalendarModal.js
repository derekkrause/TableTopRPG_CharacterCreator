import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { withGoogleMap, GoogleMap } from "react-google-maps";

class CalendarModal extends Component {
  state = {
    // modal: false,
    // name: "",
    // shortName: "",
    // eventTypeId: 0,
    // startDate: "",
    // endDate: "",
    // description: "",
    // websiteUrl: "",
    // logo: "",
    // isOngoing: false,
    // organizer: "",
    // street: "",
    // suite: "",
    // city: "",
    // state: "",
    // zip: "",
    // lat: 0.0,
    // long: 0.0,
    // eventId: 0,
    // eventItem: {},
    // organizerUser: {},
    // eventTypeItem: {}
  };

  // toggle() {
  //   this.setState({
  //     modal: !this.state.modal
  //   });
  // }

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
          <h2>{this.props.name}</h2>
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
                <div className="text-muted mb-3">Organized by {this.props.organizer}</div>
                <p className="h4 text-muted">{this.props.shortName}</p>
                <p className="h4 text-muted">Event Type: {this.props.eventTypeItem.name}</p>
                <p className="h4 text-muted">
                  <a href={this.state.websiteUrl} target="_blank">
                    {this.props.websiteUrl}
                  </a>
                </p>
                <h3>Start Date: {new Date(this.props.startDate).toDateString()}</h3>
                <h3>End Date: {new Date(this.props.endDate).toDateString()}</h3>
              </div>
            </div>
          )}
          {!this.props.logo && (
            <div className="row">
              <div className="col-md-12">
                <div className="text-muted mb-3">Organized by {this.props.organizer}</div>
                <p className="h4 text-muted">{this.props.shortName}</p>
                <p className="h4 text-muted">Event Type: {this.props.eventTypeItem.name}</p>
                <p className="h4 text-muted">
                  <a href={this.props.websiteUrl} target="_blank">
                    {this.props.websiteUrl}
                  </a>
                </p>
                <h3>Start Date: {new Date(this.props.startDate).toDateString()}</h3>
                <h3>End Date: {new Date(this.props.endDate).toDateString()}</h3>
              </div>
            </div>
          )}
          <div className="row justify-content-center">
            <div className="col-md-12">
              <h5 className="card-title my-2">Description</h5>
              <p className="">{this.props.description}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <h4>Location:</h4>

              {this.props.suite ? (
                <p>
                  {this.props.street}, Suite {this.props.suite}
                </p>
              ) : (
                <p>{this.props.street}</p>
              )}

              <p>
                {this.props.city}, {this.props.state} {this.props.zip}
              </p>
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
          <Button color="link" onClick={this.toggle}>
            I'm Going
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CalendarModal;
