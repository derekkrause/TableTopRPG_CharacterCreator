import React from "react";

class StateSelect extends React.Component {
  render() {
    const usStates = [
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
    ];

    return (
      <React.Fragment>
        <select
          className="form-control"
          name="stateEdit"
          defaultValue={this.props.defaultValue}
          placeholder="State"
          onChange={this.props.onChange}
        >
          <option value="" style={{ color: "graytext" }}>
            Select
          </option>
          {usStates.map(state => (
            <option value={state.abbr}>{state.name}</option>
          ))}
        </select>
      </React.Fragment>
    );
  }
}

export default StateSelect;
