import React from "react";
import {
  SaveButton,
  CancelButton,
  EditButton,
  CreateButton,
  DeleteButton,
  CloseButtonLight,
  CloseButtonDark
} from "./index";

class ButtonDemo extends React.Component {
  render() {
    const child1DivStyle = {
      background: "#ffffff",
      padding: "20px"
    };

    const child2DivStyle = {
      background: "#aaaaaa",
      padding: "20px"
    };

    return (
      <div>
        <div style={child1DivStyle}>
          <SaveButton />
          <EditButton />
          <CreateButton />
          <DeleteButton />
          <CloseButtonDark />
          <CancelButton />
        </div>
        <div style={child2DivStyle}>
          <div>
            <span> close button for dark background</span>
          </div>
          <CloseButtonLight />
        </div>
      </div>
    );
  }
}

export default ButtonDemo;
