import React from "react";
import "./venueSearchFilter.css";

class LocationAutocomplete extends React.Component {
  textInputRef = React.createRef();

  componentDidMount() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    const autocomplete = new google.maps.places.Autocomplete(this.textInputRef.current, { types: ["geocode"] });
    // autocomplete.bindTo("bounds", map);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      this.props.onChange(place);
      console.log("place", place);
    });
  }

  focusInput = () => {
    this.textInputRef.current.focus();
  };

  render() {
    return (
      <div>
        <input className="inputstyle" type="text" ref={this.textInputRef} />
      </div>
    );
  }
}

export default LocationAutocomplete;
