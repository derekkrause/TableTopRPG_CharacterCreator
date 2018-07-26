import React from "react";
import { NavLink } from "react-router-dom";

const SportAdminTableCells = props => {
  return (
    //   this will take your data along with admintable and map it out, place get all data here
    <tr key={props.data.id}>
      <td>
        <NavLink to={`${props.match.url}/` + props.data.id}>
          <button className="btn btn-link">Edit</button>
        </NavLink>
        <button className="btn btn-link" onClick={() => props.handleDelete(props.data.id)}>
          Delete
        </button>
      </td>
      <td>{props.data.name}</td>
      <td>{props.data.code}</td>
      <td>{props.data.gender}</td>
      <td>{JSON.stringify(props.data.inactive)}</td>
      <td>{props.data.displayOrder}</td>
    </tr>
  );
};

export default SportAdminTableCells;
