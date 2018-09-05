import React from "react";
import { getCoachBySearch } from "../../services/coach.service";
import CoachProfileCard from "../AllSearch/CoachProfileCard";
import Pagination from "../Admin/Venues/Pagination";
import { connect } from "react-redux";

class CoachSearchResults extends React.Component {
  state = {
    coaches: [],
    searchText: "",
    pageIndex: 0,
    pageSize: 10,
    totalCount: "",
    totalPages: "",
    hasResults: false,
    searchCriteria: {}
  };

  componentDidMount() {
    if (this.props.searchCriteria.searchType === "coaches") this.search();
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

    getCoachBySearch(searchCriteria.searchString ? searchCriteria.searchString : "", this.state.pageIndex, 10)
      .then(res => {
        console.log("Coach Search:", res.data.item.pagedItems);

        this.setState({
          searchText: searchCriteria.searchString,
          coaches: res.data.item.pagedItems,
          totalCount: res.data.item.totalCount,
          totalPages: res.data.item.totalPages,
          hasResults: true
        });
      })
      .catch(() => {
        console.log("Ajax error");
      });
  };

  render() {
    if (this.props.searchCriteria.searchType !== "coaches") return null;

    const { coaches } = this.state;
    return (
      <div className="mb-0 pb-0">
        {this.state.totalCount === 0 && (
          <div className="jr-card schooltag" style={{ backgroundColor: "white" }}>
            No results
          </div>
        )}
        {coaches &&
          coaches.map(coach => {
            console.log("COACH MAP", coach);

            return <CoachProfileCard data={coach} key={coach.itemData.userId} />;
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
)(CoachSearchResults);
