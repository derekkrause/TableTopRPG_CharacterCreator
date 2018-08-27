import React from "react";
import CardHeader from "./Cells/CardHeader";
import CollegeCell from "./Cells/CollegeCell";

const CollegeList = props => {
  const size = 3;
  // const colleges = props.datas.slice(0, size).map(data => {
  //   return <DotListCell key={data.id} data={data} />;
  // });
  return (
    <div className="jr-card jr-card-full-height shadow">
      <CardHeader cardTitle={props.cardTitle} cardSubTitle={props.cardSubTitle} icon={props.icon} />
      {props.datas.map(data => {
        return <CollegeCell key={data.schoolId} data={data} dotColor={props.dotColor} />;
      })}
    </div>
  );
};

export default CollegeList;
