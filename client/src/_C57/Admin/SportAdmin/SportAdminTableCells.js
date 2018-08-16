import React from "react";
import { NavLink } from "react-router-dom";
import { EditButton, DeleteButton } from "../../CustomComponents/Button";

const SportAdminTableCells = props => {
  return (
    //   this will take your data along with admintable and map it out, place get all data here
    <tr key={props.data.id}>
      <td>{props.data.name}</td>
      <td>{props.data.code}</td>
      <td>{props.data.gender}</td>
      <td>{JSON.stringify(props.data.inactive)}</td>
      <td>{props.data.displayOrder}</td>
      <td>
        <NavLink to={`${props.match.url}/` + props.data.id}>
          <EditButton />
        </NavLink>
      </td>
    </tr>
  );
};

export default SportAdminTableCells;
