import React from "react";
import { withRouter } from "react-router";
import VenueMap from "./VenueMap";
import Geocode from "react-geocode";

// GoogleApiKey is provided by John D.
// Geocode.setApiKey("AIzaSyD7iu5CfoFeysqETwfFNxbBnnwupWKewWU");

class Venue extends React.Component {
  handleOnClickEdit = () => {
    this.props.history.push("/app/admin/venues/" + this.props.venue.Id);
  };

  render() {
    return (
      <div className="justify-content-center">
        <div className="jr-card user-list flex-sm-row d-sm-flex" style={{ borderleft: "solid 20px green" }}>
          {/* <div className="animated slideInUpTiny animation-duration-3"> */}

          {/* <div className="row user-list d-flex flex-row card shadow"> */}
          {/* <div className="col-1">
            <img
              // src={this.props.venue.Logo}

              className="size-100 user-avatar"
              src="assets/images/error.png"
            />
          </div> */}

          <div className="user-list flex-sm-row">
            <h4>
              <strong>{this.props.venue.Name} </strong>
              {/* if Inactive is checked, show Inactive */}
              {this.props.venue.Inactive && <span className="text-danger">Inactive</span>}
            </h4>

            <p>
              <strong>Address: </strong>
              {this.props.venue.Street}
              <span />
              {this.props.venue.Suite}
              <br />
              {this.props.venue.City} <span />
              {this.props.venue.State}, <span />
              {this.props.venue.Zip} <span />
            </p>
            <p>
              <strong>Website: </strong>
              <a href={this.props.venue.WebsiteUrl} target="_blank">
                {this.props.venue.WebsiteUrl}
              </a>
            </p>
            <p>
              <strong>Description: </strong>
              {this.props.venue.Description}
            </p>
            <p>Id: {this.props.venue.Id}</p>

            <p />
            <button className="btn btn default" onClick={this.handleOnClickEdit}>
              Edit Location
            </button>
          </div>
          <div className="user-list flex-sm-row justify-content-center">
            <VenueMap
              key={JSON.stringify(this.props.venue)}
              location={{
                lat: this.props.venue.Lat,
                lng: this.props.venue.Lon
              }}
            />
          </div>
        </div>
      </div>
      // </div>
    );
  }
}

export default withRouter(Venue);
