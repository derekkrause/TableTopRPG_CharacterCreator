import * as React from "react";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    if (!component) {
      return null;
    }
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

class Card extends React.Component {
  render() {
    const { rank, name, division, tags, notes, logo, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div style={{ cursor: "move", opacity }}>
            {
              <tr tabIndex="-1">
                <td>{rank}</td>
                <td>
                  <div className="user-profile d-flex flex-row align-items-center">
                    <img src={logo} className="user-avatar rounded-circle mr-3" />
                    <div className="user-detail">
                      <h5 className="user-name">{name}</h5>
                    </div>
                  </div>
                </td>
                <td>{division}</td>
                <td>{notes}</td>
                <td>
                  <div className=" badge text-uppercase text-white bg-success">{tags}</div>
                </td>
                <td>
                  <span className="icon-btn size-30">
                    <i className="zmdi zmdi-more-vert zmdi-hc-lg" />
                  </span>
                </td>
              </tr>
            }
          </div>
        )
      )
    );
  }
}

export default flow(
  DragSource("card", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget("card", cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Card);
