import React from "react";

class SearchConfig extends React.Component {
  state = {
    searhText: ""
  };

  render() {
    return (
      <div>
        <InputGroup>
          <Input
            className="col-4 form-control search-input search-input-flash"
            type="text"
            placeholder="Search Key..."
            value={this.state.searchText}
            onChange={e => this.setState({ searchText: e.target.value })}
            onKeyUp={this.onKeyUp}
          />
          <Button color="primary" type="submit" className="btn btn-default" onClick={this.handleOnClickSearch}>
            <i className="zmdi zmdi-search zmdi-hc-lg" />
          </Button>
        </InputGroup>
      </div>
    );
  }
}

export default SearchConfig;
