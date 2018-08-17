import React from "react";
import CardHeader from "./Cells/CardHeader";
import DotListCell from "./Cells/DotListCell";

const CollegeList = props => {
  const size = 3;
  // const colleges = props.datas.slice(0, size).map(data => {
  //   return <DotListCell key={data.id} data={data} />;
  // });
  return (
    <div className="jr-card jr-card-full-height">
      <CardHeader cardTitle={props.cardTitle} cardSubTitle={props.cardSubTitle} icon={props.icon} />
      {props.datas.slice(0, size).map(data => {
        return <DotListCell key={data.Id} data={data} dotColor={props.dotColor} />;
      })}
    </div>
  );
};

export default CollegeList;
