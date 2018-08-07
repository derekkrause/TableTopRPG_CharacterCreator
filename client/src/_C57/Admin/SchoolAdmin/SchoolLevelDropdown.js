import React from "react";

export const SchoolType = props => {
  return (
    <div>
      <select
        className="form-control"
        value={props.value}
        name={props.name}
        onChange={e => props.handleSchoolTypeChange(e.target.value)}
      >
        <option />
        <option value="4">Junior High School</option>
        <option value="3">High School</option>
        <option value="2">Community College</option>
        <option value="1">College/University</option>
      </select>
    </div>
  );
};
