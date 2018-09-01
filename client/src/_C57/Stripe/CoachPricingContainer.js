import React from "react";
import CoachPricingCard from "./CoachPricingCard";
import CoachMonthlyCard from "./CoachMonthlyCard";
import CoachYearlyCard from "./CoachYearlyCard";
import "./stripe.css";

class CoachPricingContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className=" col-12 ">
          <div className="price-tables pt-default  justify-content-around">
            <CoachPricingCard
              styleName="card package benefits border-0  highlight"
              headerStyle="package-header headerColor text-white"
              itemStyle="package-items text-color"
              footerStyle="btn btn-default bg-primary text-white"
            />
          </div>
        </div>
        <div className="col-md-12 px-1 mx-0 ">
          <div className=" px-0 mb-2 col-md-6 float-left price-tables pt-default  justify-content-around">
            <CoachMonthlyCard
              styleName=" package bg-primary border-0 lighten-1 highlight"
              headerStyle="package-header headerColor text-white"
              itemStyle="package-items text-white"
              footerStyle="btn btn-default bg-primary text-white"
              email={this.props.email}
              fullName={this.props.fullName}
              currentUserId={this.props.currentUserId}
              showLoader={this.props.showLoader}
            />
          </div>

          <div className="px-0 col-md-6 mb-2 float-right price-tables pt-default  justify-content-around">
            <CoachYearlyCard
              styleName=" package bg-primary border-0 lighten-1 highlight"
              headerStyle="package-header headerColor text-white"
              itemStyle="package-items text-white"
              footerStyle="btn btn-default bg-primary text-white"
              email={this.props.email}
              fullName={this.props.fullName}
              currentUserId={this.props.currentUserId}
              showLoader={this.props.showLoader}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default CoachPricingContainer;
