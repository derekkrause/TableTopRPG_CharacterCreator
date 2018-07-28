import React from "react";
import BigCalendar from "react-big-calendar";
import events from "./events";
import moment from "moment";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ":  " + event.desc}
    </span>
  );
}

function EventAgenda({ event }) {
  return (
    <span>
      <em style={{ color: "magenta" }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  );
}

const ProfileCalendar = () => {
  return (
    <div className="app-calendar animated slideInUpTiny animation-duration-3">
      <BigCalendar
        events={events}
        defaultDate={Date.now()}
        defaultView="agenda"
        components={{
          event: Event,
          agenda: {
            event: EventAgenda
          }
        }}
      />
    </div>
  );
};

export default ProfileCalendar;
