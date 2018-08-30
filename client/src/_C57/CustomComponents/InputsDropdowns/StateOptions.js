import React from "react";

class StateSelect extends React.Component {
  render() {
    const usStates = [
<<<<<<< HEAD
      { name: "Alabama", abbr: "AL" },
      { name: "Alaska", abbr: "AK" },
      { name: "American Samoa", abbr: "AS" },
      { name: "Arizona", abbr: "AZ" },
      { name: "Arkansas", abbr: "AR" },
      { name: "California", abbr: "CA" },
      { name: "Colorado", abbr: "CO" },
      { name: "Connecticut", abbr: "CT" },
      { name: "Delaware", abbr: "DE" },
      { name: "District of Columbia", abbr: "DC" },
      { name: "Federated States of Micronesia", abbr: "FM" },
      { name: "Florida", abbr: "FL" },
      { name: "Georgia", abbr: "GA" },
      { name: "Guam", abbr: "GU" },
      { name: "Hawaii", abbr: "HI" },
      { name: "Idaho", abbr: "ID" },
      { name: "Illinois", abbr: "IL" },
      { name: "Indiana", abbr: "IN" },
      { name: "Iowa", abbr: "IA" },
      { name: "Kansas", abbr: "KS" },
      { name: "Kentucky", abbr: "KY" },
      { name: "Louisiana", abbr: "LA" },
      { name: "Maine", abbr: "ME" },
      { name: "Marshall Islands", abbr: "MH" },
      { name: "Maryland", abbr: "MD" },
      { name: "Massachusetts", abbr: "MA" },
      { name: "Michigan", abbr: "MI" },
      { name: "Minnesota", abbr: "MN" },
      { name: "Mississippi", abbr: "MS" },
      { name: "Missouri", abbr: "MO" },
      { name: "Montana", abbr: "MT" },
      { name: "Nebraska", abbr: "NE" },
      { name: "Nevada", abbr: "NV" },
      { name: "New Hampshire", abbr: "NH" },
      { name: "New Jersey", abbr: "NJ" },
      { name: "New Mexico", abbr: "NM" },
      { name: "New York", abbr: "NY" },
      { name: "North Carolina", abbr: "NC" },
      { name: "North Dakota", abbr: "ND" },
      { name: "Northern Mariana Islands", abbr: "MP" },
      { name: "Ohio", abbr: "OH" },
      { name: "Oklahoma", abbr: "OK" },
      { name: "Oregon", abbr: "OR" },
      { name: "Palau", abbr: "PW" },
      { name: "Pennsylvania", abbr: "PA" },
      { name: "Puerto Rico", abbr: "PR" },
      { name: "Rhode Island", abbr: "RI" },
      { name: "South Carolina", abbr: "SC" },
      { name: "South Dakota", abbr: "SD" },
      { name: "Tennessee", abbr: "TN" },
      { name: "Texas", abbr: "TX" },
      { name: "Utah", abbr: "UT" },
      { name: "Vermont", abbr: "VT" },
      { name: "Virgin Islands", abbr: "VI" },
      { name: "Virginia", abbr: "VA" },
      { name: "Washington", abbr: "WA" },
      { name: "West Virginia", abbr: "WV" },
      { name: "Wisconsin", abbr: "WI" },
      { name: "Wyoming", abbr: "WY" }
=======
      { name: "ALABAMA", abbr: "AL" },
      { name: "ALASKA", abbr: "AK" },
      { name: "AMERICAN SAMOA", abbr: "AS" },
      { name: "ARIZONA", abbr: "AZ" },
      { name: "ARKANSAS", abbr: "AR" },
      { name: "N. CALIFORNIA", abbr: "CA" },
      { name: "S. California", abbr: "NCA" },
      { name: "COLORADO", abbr: "CO" },
      { name: "CONNECTICUT", abbr: "CT" },
      { name: "DELAWARE", abbr: "DE" },
      { name: "DISTRICT OF COLUMBIA", abbr: "DC" },
      { name: "FEDERATED STATES OF MICRONESIA", abbr: "FM" },
      { name: "FLORIDA", abbr: "FL" },
      { name: "GEORGIA", abbr: "GA" },
      { name: "GUAM", abbr: "GU" },
      { name: "HAWAII", abbr: "HI" },
      { name: "IDAHO", abbr: "ID" },
      { name: "ILLINOIS", abbr: "IL" },
      { name: "INDIANA", abbr: "IN" },
      { name: "IOWA", abbr: "IA" },
      { name: "KANSAS", abbr: "KS" },
      { name: "KENTUCKY", abbr: "KY" },
      { name: "LOUISIANA", abbr: "LA" },
      { name: "MAINE", abbr: "ME" },
      { name: "MARSHALL ISLANDS", abbr: "MH" },
      { name: "MARYLAND", abbr: "MD" },
      { name: "MASSACHUSETTS", abbr: "MA" },
      { name: "MICHIGAN", abbr: "MI" },
      { name: "MINNESOTA", abbr: "MN" },
      { name: "MISSISSIPPI", abbr: "MS" },
      { name: "MISSOURI", abbr: "MO" },
      { name: "MONTANA", abbr: "MT" },
      { name: "NEBRASKA", abbr: "NE" },
      { name: "NEVADA", abbr: "NV" },
      { name: "NEW HAMPSHIRE", abbr: "NH" },
      { name: "NEW JERSEY", abbr: "NJ" },
      { name: "NEW MEXICO", abbr: "NM" },
      { name: "NEW YORK", abbr: "NY" },
      { name: "NORTH CAROLINA", abbr: "NC" },
      { name: "NORTH DAKOTA", abbr: "ND" },
      { name: "NORTHERN MARIANA ISLANDS", abbr: "MP" },
      { name: "OHIO", abbr: "OH" },
      { name: "OKLAHOMA", abbr: "OK" },
      { name: "OREGON", abbr: "OR" },
      { name: "PALAU", abbr: "PW" },
      { name: "PENNSYLVANIA", abbr: "PA" },
      { name: "PUERTO RICO", abbr: "PR" },
      { name: "RHODE ISLAND", abbr: "RI" },
      { name: "SOUTH CAROLINA", abbr: "SC" },
      { name: "SOUTH DAKOTA", abbr: "SD" },
      { name: "TENNESSEE", abbr: "TN" },
      { name: "TEXAS", abbr: "TX" },
      { name: "UTAH", abbr: "UT" },
      { name: "VERMONT", abbr: "VT" },
      { name: "VIRGIN ISLANDS", abbr: "VI" },
      { name: "VIRGINIA", abbr: "VA" },
      { name: "WASHINGTON", abbr: "WA" },
      { name: "WEST VIRGINIA", abbr: "WV" },
      { name: "WISCONSIN", abbr: "WI" },
      { name: "WYOMING", abbr: "WY" }
>>>>>>> test-branch
    ];

    return (
      <React.Fragment>
        <select
          className="form-control"
          name="stateEdit"
<<<<<<< HEAD
          value={this.props.value}
=======
          defaultValue={this.props.defaultValue}
>>>>>>> test-branch
          placeholder="State"
          onChange={this.props.onChange}
        >
          <option value="" style={{ color: "graytext" }}>
<<<<<<< HEAD
            SELECT A STATE
          </option>
          <option disabled />
          {usStates.map(state => (
            <option value={state.abbr} key={state.abbr}>
              {state.name}
            </option>
=======
            Select
          </option>
          {usStates.map(state => (
            <option value={state.abbr}>{state.name}</option>
>>>>>>> test-branch
          ))}
        </select>
      </React.Fragment>
    );
  }
}

export default StateSelect;
