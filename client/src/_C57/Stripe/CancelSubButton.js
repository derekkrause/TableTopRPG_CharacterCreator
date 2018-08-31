import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { cancelSubscription } from "./stripe.server";

class CancelSubButton extends React.Component {
  state = {
    alert: null
  };

  cancelSub = () => {
    // will add sub and customer id to redux
    cancelSubscription("sub_DTn4X7Fi48ln6S").then(() => {
      this.setState({ alert: null });
    });
  };

  delete = () => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, I am sure"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title={`Are you sure you want to cancel your subscription? `}
        onConfirm={this.cancelSub} //what function you want on confirm
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
        <div className="form-group ">
          <button type="button" className="btn btn-danger" onClick={() => this.delete()}>
            Cancel Subscription
          </button>
        </div>
        {this.state.alert}
        {/* place this in the bottom of your page usually before the last closing div but i dont think it matters too much */}
      </div>
    );
  }
}

export default CancelSubButton;
