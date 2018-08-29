import React from "react";
import SchoolMap from "./SchoolMap";

const SchoolSearchCard = props => {
  const { name, street, city, state, zip, url } = props.data;
  return (
    <div className="justify-content-center row mr-2 mr-sm-2 mr-md-0 mr-lg-0">
      <div className="col-12 col-sm-12 col-md-12 col-lg-10">
        <div className="jr-card row schooltag">
          <div className="user-list justify-content-center col-12 col-sm-5 col-md-5 col-lg-5 p-0 order-2 order-md-1 mt-3 mt-sm-0 mt-md-0 mt-lg-0">
            <SchoolMap
              key={JSON.stringify(props.data)}
              location={{
                lat: props.data.lat,
                lng: props.data.lon
              }}
            />
          </div>
          <div className="col-12 col-sm-7 col-md-7 col-lg-7 order-1 order-md-2">
            <h3 className="font-weight-bold">{name}</h3>
            {street === null ? (
              <React.Fragment>
                <p className="meta-date">
                  {city} <span />
                  {state}, <span />
                  {zip} <span />
                </p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p className="meta-date">
                  {street}
                  <br />
                  {city} <span />
                  {state}, <span />
                  {zip} <span />
                </p>
              </React.Fragment>
            )}
            <p className="text-right align-self-end">
              {url ? (
                <a href={"http://" + url} target="_blank" className="external-link">
                  <i className="zmdi zmdi-open-in-new zmdi-hc-lg" />
                  <span className="font-weight-bold"> Website </span>
                </a>
              ) : (
                ""
              )}
            </p>
            <p />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolSearchCard;
