import React from "react";

class VenueMap extends React.Component {
  // create a ref to store the mapDiv DOM element
  mapDiv = React.createRef();

  // accessing the ref using this.mapDiv.current.
  // the reference to the node becomes accessible at the 'current' attribute.
  // creating a new map inside the <div ref={this.mapDiv}.
  componentDidMount() {
    const map = new google.maps.Map(this.mapDiv.current, {
      center: this.props.location,
      zoom: 16
    });

    const marker = new google.maps.Marker({
      position: this.props.location,
      map: map
    });
  }

  render() {
    let mapstyle = {
      width: "100%",
      height: "13em",
      border: "1px solid gray"
    };

    return (
      // tell React that we want to associate the <div> ref with the 'mapDiv'
      // which is created in the constructor.
      <div>
        <div ref={this.mapDiv} style={mapstyle}>
          Map
        </div>
      </div>
    );
  }
}

export default VenueMap;
