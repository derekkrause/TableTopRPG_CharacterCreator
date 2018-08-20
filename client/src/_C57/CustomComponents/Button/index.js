import React from "react";

const SaveButton = props => {
  return (
    <button type="button" className="jr-btn btn btn-primary" onClick={props.onClick}>
      <i className="zmdi zmdi-upload zmdi-hc-lg" />
      &nbsp;&nbsp;Save
    </button>
  );
};

const SubmitButton = props => {
  return (
    <button type="button" className="jr-btn btn btn-primary" onClick={props.onClick}>
      {/* <i className="zmdi zmdi-upload zmdi-hc-lg" /> */}
      {props.name}
    </button>
  );
};

const SubmitButtonWide = props => {
  return (
    <button
      type="button"
      className="jr-btn jr-btn-primary text-uppercase btn-block btn btn-primary"
      onClick={props.onClick}
    >
      {/* <i className="zmdi zmdi-upload zmdi-hc-lg" /> */}
      {props.name}
    </button>
  );
};
const CancelButton = props => {
  return (
    <button type="button" className="jr-btn jr-btn-default btn btn-default" onClick={props.onClick}>
      {/* <i className="zmdi zmdi-upload zmdi-hc-lg" /> */}
      Cancel
    </button>
  );
};

const EditButton = props => {
  return (
    <button type="button" className="jr-btn jr-btn-default btn btn-default" onClick={props.onClick}>
      <i className="zmdi zmdi-edit zmdi-hc-lg" />
      &nbsp;&nbsp;Edit
    </button>
  );
};

const CreateButton = props => {
  return (
    <button type="button" className="jr-btn btn btn-primary" onClick={props.onClick}>
      <i className="zmdi zmdi-plus zmdi-hc-lg" />
      &nbsp;&nbsp;Add&nbsp;
      {props.name}
    </button>
  );
};

const DeleteButton = props => {
  return (
    <button type="button" className="jr-btn jr-flat-btn btn btn-default" onClick={props.onClick}>
      <i className="zmdi zmdi-delete zmdi-hc-lg" />
      &nbsp;&nbsp;Delete {props.name}
    </button>
  );
};

const CloseButtonLight = props => {
  //use this on dark background
  return (
    <button
      type="button"
      className="jr-btn jr-flat-btn jr-btn-primary btn btn-default text-white"
      onClick={props.onClick}
    >
      <i className="zmdi zmdi-close zmdi-hc-lg" />
      &nbsp;&nbsp;Close
    </button>
  );
};

const CloseButtonDark = props => {
  //use this on light background
  return (
    <button type="button" className="jr-btn jr-flat-btn btn btn-default" onClick={props.onClick}>
      <i className="zmdi zmdi-close zmdi-hc-lg" />
      &nbsp;&nbsp;Close
    </button>
  );
};

const CloseButtonText = props => {
  //use this on small area
  return (
    <button type="button" className="btn btn-default" onClick={props.onClick}>
      <i className="zmdi zmdi-close zmdi-hc-lg" />
      &nbsp;&nbsp; Close
    </button>
  );
};

const MessageButton = props => {
  return (
    <button type="button" className="jr-btn jr-btn-default btn btn-success profileInfoBtnTwo" onClick={props.onClick}>
      <i className="zmdi zmdi-comment-alt-text zmdi-hc-lg zmdi-hc-fw" />
      &nbsp;&nbsp; Message
    </button>
  );
};

const StatsButton = props => {
  return (
    <button className="jr-btn jr-btn-default btn btn-success profileInfoBtnTwo">
      <i className="zmdi zmdi-open-in-new zmdi-hc-lg" /> &nbsp;Stats
    </button>
  );
};

const FollowButton = props => {
  return <button className="jr-btn jr-btn-default btn btn-default profileInfoBtn">Follow</button>;
};

const HighlightButton = props => {
  return <button className="jr-btn jr-btn-default btn btn-default profileInfoBtn">Highlight</button>;
};

export {
  SaveButton,
  CancelButton,
  EditButton,
  DeleteButton,
  CreateButton,
  CloseButtonLight,
  CloseButtonDark,
  CloseButtonText,
  SubmitButton,
  SubmitButtonWide,
  MessageButton,
  StatsButton,
  FollowButton,
  HighlightButton
};
