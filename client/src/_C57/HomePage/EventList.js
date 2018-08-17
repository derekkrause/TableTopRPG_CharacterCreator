import React from "react";
import CardHeader from "./Cells/CardHeader";
import EventCell from "./Cells/EventCell";

const EventList = props => {
  return (
    <div className="jr-card jr-card-full-height">
      <CardHeader cardTitle={props.cardTitle} cardSubTitle={props.cardSubTitle} link="events" icon={props.icon} />
      {props.datas.map(data => {
        return <EventCell key={data.id} data={data} />;
      })}
    </div>
  );
};

export default EventList;
