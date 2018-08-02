import React from "react";

const SaveButton = () => {
  return (
    <button type="button" className="jr-btn btn btn-primary">
      <i className="zmdi zmdi-upload zmdi-hc-lg" />
      &nbsp;&nbsp;Save
    </button>
  );
};

const CancelButton = () => {
  return (
    <button type="button" className="jr-btn jr-btn-default btn btn-default">
      {/* <i className="zmdi zmdi-upload zmdi-hc-lg" /> */}
      Cancel
    </button>
  );
};

const EditButton = () => {
  return (
    <button type="button" className="jr-btn jr-btn-default btn btn-default">
      <i className="zmdi zmdi-edit zmdi-hc-lg" />
      &nbsp;&nbsp;Edit
    </button>
  );
};

const CreateButton = () => {
  return (
    <button type="button" className="jr-btn btn btn-primary">
      <i className="zmdi zmdi-plus zmdi-hc-lg" />
      &nbsp;&nbsp;Add
    </button>
  );
};

const DeleteButton = () => {
  return (
    <button type="button" className="jr-btn jr-flat-btn btn btn-default">
      <i className="zmdi zmdi-delete zmdi-hc-lg" />
      &nbsp;&nbsp;Delete
    </button>
  );
};

const CloseButtonLight = () => {
  //use this on dark background
  return (
    <button type="button" className="jr-btn jr-flat-btn jr-btn-primary btn btn-default text-white">
      <i className="zmdi zmdi-close zmdi-hc-lg" />
      &nbsp;&nbsp;Close
    </button>
  );
};

const CloseButtonDark = () => {
  //use this on light background
  return (
    <button type="button" className="jr-btn jr-flat-btn btn btn-default">
      <i className="zmdi zmdi-close zmdi-hc-lg" />
      &nbsp;&nbsp;Close
    </button>
  );
};

export { SaveButton, CancelButton, EditButton, CreateButton, DeleteButton, CloseButtonLight, CloseButtonDark };
