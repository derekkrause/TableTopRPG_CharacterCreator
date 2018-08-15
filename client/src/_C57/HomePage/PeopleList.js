import React from "react";
import CardHeader from "./Cells/CardHeader";
import PeopleCell from "./Cells/PeopleCell";

const PeopleList = props => {
  return (
    <div className="jr-card jr-card-full-height">
      <CardHeader cardTitle={props.cardTitle} cardSubTitle={props.cardSubTitle} icon={props.icon} />
      {props.datas.map(data => {
        return (
          <PeopleCell
            key={data.userId}
            data={data}
            color={props.color}
            path={props.path}
            borderColor={props.borderColor}
          />
        );
      })}
    </div>
  );
};

export default PeopleList;
