import React from "react";
import { search as pogSearch } from "../../services/pog.service";
import { Badge, Button } from "reactstrap";
import moment from "moment";

class PogAdmin extends React.Component {
  state = {
    searchString: "",
    pogs: [],
    pageIndex: 0,
    pageSize: 6,
    totalCount: 0,
    totalPages: 0
  };

  onClick = () => {
    pogSearch(this.state.searchString, 0, this.state.pageSize).then(response => {
      const result = response.data.item;
      this.setState({
        pageIndex: result.pageIndex,
        pageSize: result.pageSize,
        pogs: result.pagedItems,
        totalCount: result.totalCount,
        totalPages: result.totalPages
      });
    });
  };

  onChange = e => {
    this.setState({ searchString: e.target.value });
  };

  render() {
    const { searchString, pogs, pageIndex, pageSize, totalCount, totalPages } = this.state;
    return (
      <div>
        <div className="col-12">
          <div className="mx-auto my-2">
            <input className="my-auto" value={searchString} onChange={e => this.onChange(e)} />
            <Button className="my-auto ml-2" color="primary" size="sm" onClick={this.onClick}>
              Search
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="jr-card m-2">
              <ul className="list-unstyled">
                {pogs.map(pog => (
                  <li key="{pog.Id}" className="media media-list post-list">
                    <div className="size-80 post-image mr-3">
                      <div className="grid-thumb-equal rounded">
                        <div className="grid-thumb-cover">
                          <img className="img-fluid rounded" src={pog.Url} alt="user-image" />
                        </div>
                      </div>
                    </div>
                    <div className="media-body">
                      <h4 className="mt-0 mb-1">{pog.Name}</h4>
                      <p className="meta-date mb-1">{pog.StartDate && moment(pog.StartDate).format("lll")}</p>
                      <p className="text-muted">
                        <Badge color="primary">{pog.Points}</Badge>
                        <span>{pog.Country}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PogAdmin;
