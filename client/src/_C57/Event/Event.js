import React, { Component } from "react";

class Event extends Component {
  state = {
    Name: "",
    ShortName: "",
    EventTypeId: 0,
    StartDate: "",
    EndDate: "",
    Description: "",
    WebsiteUrl: "",
    Logo: "",
    IsOngoing: false,
    Organizer: "",
    Street: "",
    Suite: "",
    City: "",
    Zip: "",
    Lat: 0.0,
    Long: 0.0
  };

  render() {
    const Event = this.state;

    return (
      <div>
        <h2>Event Page!</h2>
        Name: {this.state.Name}
        <div>{CardBox}</div>
      </div>
    );
  }
}

export default Event;

// const CardBox = ({
//   heading,
//   children,
//   styleName,
//   cardStyle,
//   childrenStyle,
//   headerOutside
// }) => {
//   return (
//     <div className={`${styleName}`}>
//       {headerOutside && (
//         <div className="jr-entry-header">
//           <h3 className="entry-heading heading">{heading}</h3>
//           {children.length > 1 && (
//             <div className="entry-description">{children[0]}</div>
//           )}
//         </div>
//       )}

//       <div className={`jr-card ${cardStyle}`}>
//         {!headerOutside &&
//           (heading && (
//             <div className="jr-card-header">
//               <h3 className="card-heading">{heading}</h3>
//               {children.length > 1 && (
//                 <div className="sub-heading">{children[0]}</div>
//               )}
//             </div>
//           ))}
//         <div className={`jr-card-body ${childrenStyle}`}>
//           {children.length > 1 ? children[1] : children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardBox;

// CardBox.defaultProps = {
//   cardStyle: "",
//   childrenStyle: "",
//   styleName: "col-lg-6 col-sm-12"
// };
