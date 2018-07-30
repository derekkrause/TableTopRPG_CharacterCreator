import React from "react";
//import { SortableElement, SortableHandle } from "react-sortable-hoc";
import Card from "./Card";
const update = require("immutability-helper");
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class MainPage extends React.Component {
  state = {
    schools: [
      {
        id: 1,
        rank: 1,
        schoolName: "UCLA",
        division: 1,
        notes: "Be on the lookout for incoming mail",
        tags: "first choice",
        activityLog: "enter button here",
        logo: "http://res.cloudinary.com/dv4p9sgci/image/upload/c_scale,w_50/v1532386028/UCLA.png"
      },
      {
        id: 2,
        rank: 1,
        schoolName: "USC",
        division: 1,
        notes: "Recruiting event is right around the corner",
        tags: "second choice",
        activityLog: "enter button here",
        logo: "http://res.cloudinary.com/dv4p9sgci/image/upload/c_scale,w_50/v1532387441/USCjpg.jpg"
      }
    ]
  };

  moveCard = (dragIndex, hoverIndex) => {
    const { schools } = this.state;
    const dragCard = schools[dragIndex];

    this.setState(
      update(this.state, {
        schools: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="app-header" />
        <div className="app-main-content">
          <div className="animated slideInUpTiny animation-duration-3">
            <div className="col-12">
              <div className="jr-card">
                <div className="jr-card-header d-flex align-items-center">
                  <h3 className="mb-0">
                    <span>Prospective Schools/Coaches</span>
                  </h3>
                </div>
                <div className="table-responsive-material">
                  <table className="default-table table-unbordered table table-sm table-hover">
                    <thead className="th-border-b">
                      <tr>
                        <th>Ranking</th>
                        <th>School Name</th>
                        <th>Division</th>
                        <th>Notes</th>
                        <th>Tags</th>
                        <th>Activity Log</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.schools.map((school, i) => (
                        <Card
                          key={school.id}
                          index={i}
                          id={school.id}
                          name={school.schoolName}
                          rank={school.rank}
                          division={school.division}
                          notes={school.notes}
                          tags={school.tags}
                          activityLog={school.activityLog}
                          moveCard={this.moveCard}
                          logo={school.logo}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DragDropContext(HTML5Backend)(MainPage);
