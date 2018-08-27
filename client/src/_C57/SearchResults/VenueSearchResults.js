import React from "react";
import Axios from "../../../node_modules/axios";
import { getVenueBySearchByUser } from "services/venuesService";
import { connect } from "react-redux";
import VenueMap from "../Admin/Venues/VenueMap";

class VenueSearchResults extends React.Component {
  state = {
    venues: [],
    pageIndex: 0,
    pageSize: 10,
    lat: 0,
    lon: 0
  };

  componentDidMount() {
    if (this.props.searchCriteria.searchType === "venues") this.search();
  }

  search = () => {
    const { searchCriteria } = this.props;
    const { pageIndex, pageSize } = this.state;
    const data = {
      city: this.state.city,
      state: this.state.state
    };

    const address = searchCriteria.data;

    getVenueBySearchByUser(
      searchCriteria.searchString,
      searchCriteria.radius ? searchCriteria.radius : null,
      0, // pageIndex,
      10, // pageSize,
      searchCriteria.location ? searchCriteria.location.lat : null,
      searchCriteria.location ? searchCriteria.location.lng : null
    )
      .then(res => {
        console.log("Venue Main Search:", res.data.item.pagedItems);
        this.setState({
          venues: res.data.item.pagedItems
        });
      })
      .catch(() => {
        console.log("Ajax error");
      });
  };

  render() {
    if (this.props.searchCriteria.searchType !== "venues") return null;
    // console.log("render venues: ", this.state.venues);
    const { venues } = this.state;
    return (
      <div className="mb-0 pb-0">
        {/* <Pagination /> */}
        {!venues && (
          <div className="jr-card venuetag" style={{ backgroundColor: "white" }}>
            No results
          </div>
        )}
        {venues &&
          venues.map(venue => {
            return (
              <div className="jr-card user-list row venuetag">
                <div className="user-list  col-lg-6">
                  <h4>
                    <strong>{venue.Name} </strong>
                    {/* if Inactive is checked, show Inactive */}
                    {venue.Inactive && <span className="text-danger">Inactive</span>}
                  </h4>

                  <p>
                    <strong>Address: </strong>
                    {venue.Street}
                    <span />
                    {venue.Suite}
                    <br />
                    {venue.City} <span />
                    {venue.State}, <span />
                    {venue.Zip} <span />
                  </p>
                  <p className="text-truncate">
                    <strong>Website: </strong>
                    <a href={venue.WebsiteUrl} target="_blank">
                      {venue.WebsiteUrl}
                    </a>
                  </p>
                  <p>
                    <strong>Description: </strong>
                    {venue.Description}
                  </p>

                  <p />
                </div>
                <div className="user-list justify-content-center col-lg-5">
                  <VenueMap
                    key={JSON.stringify(venue)}
                    location={{
                      lat: venue.Lat,
                      lng: venue.Lon
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchCriteria: state.searchCriteria
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSearchCriteria: searchCriteria => dispatch({ type: "SET_SEARCH_CRITERIA", searchCriteria })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VenueSearchResults);
