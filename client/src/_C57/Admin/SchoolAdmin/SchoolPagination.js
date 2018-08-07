import React from "react";
import "./schoolStyle.css";

class Pagination extends React.Component {
  state = {
    first: null,
    second: null,
    third: null,
    PageIndex: null
  };

  componentWillReceiveProps(props) {
    this.setState({
      first: props.pageIndex + 1,
      second: props.pageIndex + 2,
      third: props.pageIndex + 3,
      PageIndex: props.pageIndex
    });
    //  console.log("these are props", props);
  }

  nextPage = () => {
    if (this.state.third <= this.props.TotalPages) {
      this.setState(
        {
          first: this.state.first + 1,
          second: this.state.second + 1,
          third: this.state.third + 1,
          PageIndex: this.state.PageIndex + 1
        },
        () => {
          this.props.changePage(this.state.PageIndex);
          //   console.log("Page fwd", this.state.PageIndex);
        }
      );
    } else {
      this.setState({
        first: this.state.first,
        second: this.state.second,
        third: this.state.third,
        PageIndex: this.state.PageIndex
      });
    }
  };
  lastPage = () => {
    if (this.state.first >= 2) {
      this.setState(
        {
          first: this.state.first - 1,
          second: this.state.second - 1,
          third: this.state.third - 1,
          PageIndex: this.state.PageIndex - 1
        },
        () => {
          this.props.changePage(this.state.PageIndex);
          //  console.log("pageBack", this.state.PageIndex);
        }
      );
    } else if (this.state.PageIndex == 0) {
      this.setState({
        PageIndex: this.state.PageIndex - 1
      });
    } else {
      null;
    }
  };
  choosePage = page => {
    this.setState(
      {
        first: page,
        second: page,
        third: page,
        PageIndex: page
      },
      () => {
        this.props.changePage(page);
      }
    );
  };

  render() {
    return (
      <div>
        <ul className="pagination justify-content-md-center ">
          <li>
            {this.state.first != 1 && (
              <button type="button" className="paginationButton" onClick={this.lastPage}>
                Prev
              </button>
            )}
          </li>

          <li>
            {this.props.TotalPages > 2 && (
              <button
                type="button"
                className="paginationButton pageNumber"
                onClick={() => this.choosePage(this.state.first - 1)}
              >
                {this.state.first}
              </button>
            )}
          </li>
          <li>
            {this.props.TotalPages > 2 && (
              <button
                type="button"
                className="paginationButton pageNumber"
                onClick={() => this.choosePage(this.state.second - 1)}
              >
                {this.state.second}
              </button>
            )}
          </li>
          <li>
            {this.props.TotalPages > 3 && (
              <button
                type="button"
                className="paginationButton pageNumber"
                onClick={() => this.choosePage(this.state.third - 1)}
              >
                {this.state.third}
              </button>
            )}
          </li>
          {this.state.third < this.props.TotalPages - 1 && (
            <li>
              {this.props.TotalPages > 2 ? (
                <button type="button" className="paginationButton" onClick={this.nextPage}>
                  Next
                </button>
              ) : (
                <div />
              )}
            </li>
          )}
        </ul>
        <div>
          Page {this.state.first} of {this.props.TotalPages > 1 ? this.props.TotalPages : 1}
        </div>
      </div>
    );
  }
}

export default Pagination;
