import React from "react";
import { getSchoolBySearch } from "../../services/school.service";
import { connect } from "react-redux";
import SchoolSearchCard from "../Schools/SchoolSearchCard";
import Geocode from "react-geocode";
import { getStatesList } from "../NavBar/StatesList";
import Pagination from "../Admin/Venues/Pagination";
import { CreateButton } from "../CustomComponents/Button";

class SchoolSearchResults extends React.Component {
  state = {
    schools: [],
    searchText: "",
    pageIndex: 0,
    pageSize: 10,
    totalCount: "",
    totalPages: "",
    hasResults: false,
    lat: "",
    lng: "",
    radius: "",
    searchCriteria: {}
  };

  componentDidMount() {
    if (this.props.searchCriteria.searchType === "schools") this.search();
    /*
    //GEOCODE API FOR ADD SCHOOL 
    const googleApiKey = "AIzaSyA6UaP-xYgEZ1ItLFGYjVYOkN5vKAV_o9A";
    Geocode.setApiKey(googleApiKey);
    */
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchCriteria !== prevProps.searchCriteria) {
      const { searchCriteria } = this.props;
      this.setState({ searchCriteria: searchCriteria });

      this.search(searchCriteria);
    }
  }

  search = () => {
    const { searchCriteria } = this.props;

    getSchoolBySearch(
      searchCriteria.searchString ? searchCriteria.searchString : "",
      this.state.pageIndex,
      10,
      searchCriteria.location ? searchCriteria.location.lat : null,
      searchCriteria.location ? searchCriteria.location.lng : null,
      searchCriteria.collapsed !== true && searchCriteria.radius ? searchCriteria.radius : null
    )
      .then(res => {
        //console.log("School Search:", res.data.item.pagedItems);

        this.setState({
          searchText: searchCriteria.searchString,
          schools: res.data.item.pagedItems,
          totalCount: res.data.item.totalCount,
          totalPages: res.data.item.totalPages,
          hasResults: true
        });
      })
      .catch(() => {
        console.log("Ajax error");
      });
  };

  /*
  //LEAVE THIS FUNCTION FOR ADD SCHOOL

  addSchool = payload => {
    //console.log("SCHOOL UPDATE PAYLOAD", payload);
    const schoolId = payload.id;
    updateSchools(payload, schoolId).then(res => {
      //console.log("SCHOOL UPDATE", res);
      this.search(res => {
        this.setState({
          schools: res.data.item.pagedItems
        });
      });
    });
  };
  
  convertAddressToLatLng = addressObj => {
    const sampleAddress = "Eiffel Tower";

    const address = `${addressObj.Street}, ${addressObj.City}, ${addressObj.State} ${addressObj.Zip}`;

    console.log("address: ", address);

    if (address) {
      console.log("Converting from address: ", address);
      console.log("to Lat/Long coordinates...");

      Geocode.fromAddress(address).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);

          this.setState({ lat: lat, long: lng }, () => {});
        },
        error => {
          console.error(error);
        }
      );
    }
  };
  */

  // ----- PAGINATION -----

  firstPage = () => {
    this.setState(
      {
        pageIndex: 0
      },
      this.search
    );
  };

  prevPage = () => {
    const prevPage = this.state.pageIndex - 1;
    this.setState(
      {
        pageIndex: prevPage
      },
      this.search
    );
  };
  nextPage = () => {
    const nextPage = this.state.pageIndex + 1;
    this.setState(
      {
        pageIndex: nextPage
      },
      this.search
    );
  };

  lastPage = () => {
    const endPage = this.state.totalPages - 1;
    this.setState(
      {
        pageIndex: endPage
      },
      this.search
    );
  };

  render() {
    if (this.props.searchCriteria.searchType !== "schools") return null;
    //console.log("render schools: ", this.state.schools);
    const { schools } = this.state;
    return (
      <div className="mb-0 pb-0">
        <div className="d-flex justify-content-end mb-4">
          <CreateButton name="School" />
        </div>
        {this.state.totalCount === 0 && (
          <div className="jr-card schooltag" style={{ backgroundColor: "white" }}>
            No results
          </div>
        )}
        {schools &&
          schools.map(school => {
            return <SchoolSearchCard data={school} key={school.schoolId} />;
          })}
        {this.state.totalCount !== 0 && (
          <div className="pb-4">
            <Pagination
              pageIndex={this.state.pageIndex}
              totalPages={this.state.totalPages}
              searchText={this.state.searchText}
              firstPage={this.firstPage}
              prevPage={this.prevPage}
              nextPage={this.nextPage}
              lastPage={this.lastPage}
            />
          </div>
        )}
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
)(SchoolSearchResults);
