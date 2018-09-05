import React from "react";
import Axios from "../../../node_modules/axios";
import { getVenueBySearchByUser } from "../../services/venuesService";
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchCriteria !== prevProps.searchCriteria) {
      if (this.props.searchCriteria.searchType === "venues") this.search();
    }
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
              <div className="justify-content-center row mr-2 mr-sm-2 mr-md-0 mr-lg-0 mb-4">
                <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                  <div className="jr-card row venuetag">
                    <div className="user-list justify-content-center col-12 col-sm-5 col-md-5 col-lg-5 p-0 order-2 order-md-1 mt-3 mt-sm-0 mt-md-0 mt-lg-0">
                      <VenueMap
                        key={JSON.stringify(venue)}
                        location={{
                          lat: venue.Lat,
                          lng: venue.Lon
                        }}
                      />
                    </div>
                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 order-1 order-md-2">
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
                      {/* <p className="text-truncate">
                        <strong>Website: </strong>
                        <a href={venue.WebsiteUrl} target="_blank">
                          {venue.WebsiteUrl}
                        </a>
                      </p> */}
                      <p>
                        <strong>Description: </strong>
                        {venue.Description}
                      </p>
                      <p className="text-right align-self-end">
                        {venue.WebsiteUrl ? (
                          <a href={venue.WebsiteUrl} target="_blank" className="external-link">
                            <i className="zmdi zmdi-open-in-new zmdi-hc-lg" />
                            <span className="font-weight-bold"> Website </span>
                          </a>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                  </div>
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
