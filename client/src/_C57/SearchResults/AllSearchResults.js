import React from "react";

import AllSearch from "../AllSearch/AllSearch";

class AllSearchResults extends React.Component {
  render() {
    return (
      <div>
        {/* <h1> “I’m just a simple man trying to make my way in the universe.” — Jango Fett</h1>
        <h1> &nbsp;</h1>
        <h1> “I find your lack of faith disturbing.” — Darth Vader</h1>
        <h1> &nbsp;</h1> */}
        <AllSearch {...this.props} />
      </div>
    );
  }
}
export default AllSearchResults;
