import React from "react";
import { search } from "../../services/pog.service";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText
} from "reactstrap";
import moment from "moment";

class Pogs extends React.Component {
  state = {
    searchString: "",
    pogs: [],
    pageIndex: 0,
    pageSize: 12,
    totalCount: 0,
    totalPages: 0
  };

  onSearchClick = event => {
    search(event.target.value, 0, this.state.pageSize).then(response => {
      const result = response.data.item;
      debugger;
      this.setState({
        pageIndex: result.pageIndex,
        pageSize: result.pageSize,
        pogs: result.pagedItems,
        totalCount: result.totalCount,
        totalPages: result.totalPages
      });
    });
  };

  render() {
    const {
      searchString,
      pogs,
      pageIndex,
      pageSize,
      totalCount,
      totalPages
    } = this.state;
    return (
      <div>
        <input value={searchString} onChange={e => this.onSearchClick(e)} />
        <div className="row mb-md-4">
          {pogs.map(pog => (
            <div key="{pog.Id}" className="row overflow-hidden">
              <img
                className="col-md-4"
                top
                src={pog.Url}
                style={{
                  width: "25%",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              />
              <div className="col-md-8">
                <h3 className="card-title">{pog.Name}</h3>
                <h5>{pog.Country}</h5>
                <p>{pog.StartDate && moment(pog.StartDate).format("lll")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Pogs;
