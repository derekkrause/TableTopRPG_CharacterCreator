import React from "react";
import { ButtonGroup, Button } from "reactstrap";

class Pagination extends React.Component {
  render() {
    const currentPage = this.props.pageIndex + 1;
    const endPage = this.props.totalPages;

    return (
      <div className="d-flex justify-content-center">
        <ButtonGroup>
          <Button color="primary" outline onClick={this.props.firstPage} disabled={currentPage == 1 ? true : false}>
            First
          </Button>

          <Button color="primary" outline onClick={this.props.prevPage} disabled={currentPage == 1 ? true : false}>
            Prev
          </Button>

          <Button color="primary" outline disabled>
            <span>{currentPage}</span>
          </Button>

          <Button
            color="primary"
            outline
            onClick={this.props.nextPage}
            disabled={endPage == currentPage ? true : false}
          >
            Next
          </Button>

          <Button
            color="primary"
            outline
            onClick={this.props.lastPage}
            disabled={endPage == currentPage ? true : false}
          >
            Last
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Pagination;
