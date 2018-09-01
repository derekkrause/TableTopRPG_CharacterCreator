import React, { Component } from "react";
import { Table, InputGroupAddon, Input, Button, InputGroup } from "reactstrap";
import SchoolTableCells from "./SchoolTableCells";
import { NavLink, withRouter } from "react-router-dom";
import { getSchools, schoolSearch } from "./SchoolAdminServer";
import "./schoolStyle.css";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Pagination from "./SchoolPagination";

import { CreateButton } from "../../CustomComponents/Button";

class SchoolTable extends Component {
  state = {
    schoolData: [],
    pageIndex: 0,
    searchTerm: "",
    totalPages: 0,
    type: ""
  };
  componentDidMount() {
    getSchools(this.state.pageIndex)
      .then(res => {
        // console.log(res.data.resultSets);
        this.setState({
          schoolData: res.data.resultSets[0],
          totalPages: res.data.resultSets[1][0].TotalPages
        });
        //console.log(this.state.totalPages);
      })
      .catch(err => {
        //console.log(err);
      });
  }
  schoolSearch = () => {
    {
      this.state.searchTerm
        ? this.setState({ pageIndex: 0 }, () => {
            schoolSearch(this.state.pageIndex, this.state.searchTerm).then(res => {
              // console.log(res);
              if (res.data.resultSets.length >= 2) {
                this.setState(
                  {
                    schoolData: res.data.resultSets[1],
                    totalPages: res.data.resultSets[0][0].TotalPages
                  },
                  () => {
                    // console.log(res.data);
                  }
                );
              } else {
                this.sendNotification("SearchError");
                this.createNotification(this.state.type);
              }
            });
          })
        : this.setState({ pageIndex: 0 }, () => {
            getSchools(this.state.pageIndex)
              .then(res => {
                //console.log(res.data.resultSets);
                this.setState({
                  schoolData: res.data.resultSets[0],
                  totalPages: res.data.resultSets[1][0].TotalPages
                });
                //console.log(this.state.totalPages);
              })
              .catch(err => {
                //  console.log(err);
              });
          });
    }
  };
  changePage = pageNumber => {
    {
      this.state.searchTerm
        ? this.setState({ pageIndex: pageNumber }, () => {
            schoolSearch(pageNumber, this.state.searchTerm).then(res => {
              //   console.log(res);
              this.setState({
                schoolData: res.data.resultSets[1],
                totalPages: res.data.resultSets[0][0].TotalPages
              });
            });
          })
        : this.setState({ pageIndex: pageNumber }, () => {
            //  console.log("table", this.state.pageIndex);
            getSchools(pageNumber).then(res => {
              //   console.log(res);
              this.setState({
                schoolData: res.data.resultSets[0],
                totalPages: res.data.resultSets[1][0].TotalPages
              });
            });
          });
    }
  };
  createNotification = type => {
    //console.log(type, "notification");

    switch (type) {
      case "SearchError":
        NotificationManager.error(`${this.state.searchTerm} is not a valid search`, null, 3000);
        break;
    }
  };
  sendNotification = type => {
    this.setState({ type: type });
    //console.log("send notification");
  };

  render() {
    return (
      <div>
        <div className="row ">
          <div className="col-md-10 ">
            <InputGroup className="mb-2">
              <Input
                className="form-control search-input search-input-flash"
                type="search"
                name="searchString"
                placeholder="Search here..."
                onKeyPress={e => {
                  e.key == "Enter" ? this.schoolSearch() : null;
                }}
                onChange={e => this.setState({ searchTerm: e.target.value })}
                value={this.state.searchTerm}
              />
              <InputGroupAddon addonType="append" className="search-input-button">
                <Button color="primary" onClick={this.schoolSearch}>
                  <i className="zmdi zmdi-search zmdi-hc-lg " />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="col-md-2 ">
            <NavLink className="float-right pt-3" to={`${this.props.match.url}/create`}>
              <CreateButton />
            </NavLink>
          </div>
        </div>

        <Table className="table-middle table   ">
          <tbody>
            <tr style={{ fontSize: "15px", fontWeight: "bold" }}>
              <td>School Name</td>
              <td>Street</td>
              <td>City</td>
              <td>State</td>
              <td>Zip</td>
              <td />
            </tr>

            {this.state.schoolData.map(school => {
              return <SchoolTableCells data={school} key={school.Id} {...this.props} />;
            })}
          </tbody>
        </Table>
        <div>
          <Pagination
            pageIndex={this.state.pageIndex}
            TotalPages={this.state.totalPages}
            changePage={this.changePage}
            resultsPerPage={10}
          />
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default withRouter(SchoolTable);
