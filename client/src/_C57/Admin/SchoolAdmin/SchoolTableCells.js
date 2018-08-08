import React from "react";
import { NavLink } from "react-router-dom";
import "./schoolStyle.css";

const SchoolTableCells = props => {
  const pascal = str => {
    if (str != null) {
      const lowerStr = str.toLowerCase();
      const newStr = lowerStr[0].toUpperCase() + lowerStr.slice(1);
      return newStr;
    }
  };

  // console.log(props);
  return (
    <tr key={props.data.Id}>
      <td>{pascal(props.data.Name)}</td>

      <td>{pascal(props.data.Street)}</td>

      <td>{pascal(props.data.City)}</td>

      <td>{props.data.State}</td>

      <td>{props.data.Zip}</td>
      <td>
        <NavLink to={`${props.match.path}/edit/${props.data.Id}`}>
          <button className="btn btn-link">
            <small>Edit</small>
          </button>
        </NavLink>
      </td>
    </tr>
  );
};

export default SchoolTableCells;
