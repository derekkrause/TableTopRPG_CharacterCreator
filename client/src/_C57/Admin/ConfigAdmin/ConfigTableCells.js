import React from "react";
import { NavLink } from "react-router-dom";
import { EditButton, DeleteButton } from "../../CustomComponents/Button";
import { mapPropsStream } from "recompose";

const ConfigTableCells = props => {
  return (
    <tr key={props.config.Id}>
      {/* <td>{props.config.Id}</td> */}
      <td>{props.config.Key}</td>
      <td>{props.config.Value}</td>
      <td>
        <NavLink to={`${props.match.url}/` + props.config.Id}>
          <EditButton />
        </NavLink>
      </td>
    </tr>
  );
};

export default ConfigTableCells;
