import React from "react";
import AthletePricingCard from "./AthletePricingCard";
import AthleteMonthlyCard from "./AthleteMonthlyCard";
import AthleteYearlyCard from "./AthleteYearlyCard";

class AthletePricingContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className=" col-12 ">
          <div className="price-tables pt-default  justify-content-around">
            <AthletePricingCard
              styleName="card package benefits border-0 lighten-1 highlight"
              headerStyle="package-header headerColor text-white"
              itemStyle="package-items text-color"
              footerStyle="btn btn-default benefits text-white"
            />
          </div>
        </div>
        <div className="col-md-12 px-1 mx-0 ">
          <div className=" px-0 mb-2 col-md-6 float-left price-tables pt-default  justify-content-around">
            <AthleteMonthlyCard
              styleName=" package benefits border-0 lighten-1 highlight"
              headerStyle="package-header headerColor text-white"
              itemStyle="package-items text-white"
              footerStyle="btn btn-default benefits text-white"
              email={this.props.email}
              fullName={this.props.fullName}
              currentUserId={this.props.currentUserId}
              showLoader={this.props.showLoader}
            />
          </div>

          <div className="px-0 col-md-6 mb-2 float-right price-tables pt-default  justify-content-around">
            <AthleteYearlyCard
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
export default AthletePricingContainer;
