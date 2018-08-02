import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

class SweetExample extends React.Component {
  // this isn't component. Copy/paste state, function and {this.state.alert} and read addtional instruction below.

  state = {
    alert: null // have an alert state
  };

  delete = () => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title={`Are you sure you want to delete `}
        onConfirm={this.whatFunctionYouWantToCallAfterConfirm} //what function you want on confirm
        onCancel={this.onClickCancel} //what function you want on cancel
      />
    );
    this.setState({ alert: getAlert() });
  };

  onClickCancel = () => {
    this.setState({ alert: null });
  };
  render() {
    return (
      <div>
        <div className="form-group text-left">
          <button type="button" className="btn btn-danger" onClick={() => this.delete()}>
            Delete
          </button>
        </div>
        {this.state.alert}
        {/* place this in the bottom of your page usually before the last closing div but i dont think it matters too much */}
      </div>
    );
  }
}

export default SweetExample;
