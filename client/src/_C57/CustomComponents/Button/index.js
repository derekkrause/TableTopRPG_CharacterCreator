import React from "react";
import "./Button.css";

const SaveButton = props => {
  return (
    <button type="button" className="jr-btn btn rs-btn-primary-light mb-0" onClick={props.onClick}>
      <i className="zmdi zmdi-upload zmdi-hc-lg" />
      &nbsp;&nbsp;Save
    </button>
  );
};

const SubmitButton = props => {
  return (
    <button type="button" className="jr-btn btn rs-btn-primary-light" onClick={props.onClick}>
      {/* <i className="zmdi zmdi-upload zmdi-hc-lg" /> */}
      {props.name}
    </button>
  );
};

const SubmitButtonWide = props => {
  return (
    <button
      type="button"
      className="jr-btn jr-btn-primary text-uppercase btn-block btn rs-btn-primary-light"
      onClick={props.onClick}
    >
      {/* <i className="zmdi zmdi-upload zmdi-hc-lg" /> */}
      {props.name}
    </button>
  );
};
const CancelButton = props => {
  return (
    <button type="button" className="jr-btn jr-btn-default btn btn-default mb-0" onClick={props.onClick}>
      {/* <i className="zmdi zmdi-upload zmdi-hc-lg" /> */}
      Cancel
    </button>
  );
};

const EditButton = props => {
  return (
    <button type="button" className="jr-btn jr-btn-default btn btn-default mb-0" onClick={props.onClick}>
      <i className="zmdi zmdi-edit zmdi-hc-lg" />
      &nbsp;&nbsp;Edit
    </button>
  );
};

const CreateButton = props => {
  return (
    <button type="button" className="jr-btn btn rs-btn-primary-light mb-0" onClick={props.onClick}>
      <i className="zmdi zmdi-plus zmdi-hc-lg" />
      &nbsp;&nbsp;Add&nbsp;
      {props.name}
    </button>
  );
};

const DeleteButtonBorder = props => {
  return (
    <button type="button" className="jr-btn jr-btn-default btn btn-default" onClick={props.onClick}>
      <i className="zmdi zmdi-delete zmdi-hc-lg" />
      &nbsp;&nbsp;Delete {props.name}
    </button>
  );
};
const DeleteButton = props => {
  return (
    <button type="button" className="jr-btn jr-flat-btn btn btn-default mb-0" onClick={props.onClick}>
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
      className="jr-btn jr-flat-btn jr-btn-primary btn btn-default text-white mb-0"
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
    <button type="button" className="jr-btn jr-flat-btn btn btn-default mb-0" onClick={props.onClick}>
      <i className="zmdi zmdi-close zmdi-hc-lg" />
      &nbsp;&nbsp;Close
    </button>
  );
};

const CloseButtonText = props => {
  //use this on small area
  return (
    <button type="button" className="btn btn-default mb-0" onClick={props.onClick}>
      <i className="zmdi zmdi-close zmdi-hc-lg" />
      &nbsp;&nbsp; Close
    </button>
  );
};

const MessageButton = props => {
  return (
    <button
      type="button"
      className={`jr-btn jr-btn-default btn btn-default ${props.style} ${props.margin}`}
      onClick={props.onClick}
    >
      <div className="d-flex justify-content-center align-items-center">
        <i className="zmdi zmdi-comment-alt-text zmdi-hc-lg zmdi-hc-lg" />
        &nbsp;&nbsp;
        <h4 className="mb-0"> Message</h4>
      </div>
    </button>
  );
};

const StatsButton = props => {
  return (
    <button
      type="button"
      className={`jr-btn jr-btn-default btn btn-default ${props.style} ${props.margin}`}
      onClick={props.onClick}
    >
      <div className="d-flex justify-content-center align-items-center">
        <i className="zmdi zmdi-link zmdi-hc-lg" /> &nbsp;
        <h4 className="mb-0">Links</h4>
      </div>
    </button>
  );
};

const LikeButton = props => {
  return (
    <button type="button" className="jr-btn jr-flat-btn btn btn-default mb-0" onClick={props.onClick}>
      <i className="zmdi zmdi-favorite-outline zmdi-hc-lg" style={{ color: "#aaaaaa" }} />
      &nbsp;&nbsp; Like
    </button>
  );
};
const LikedButton = props => {
  return (
    <button type="button" className="jr-btn jr-flat-btn btn btn-default mb-0" onClick={props.onClick}>
      <i className="zmdi zmdi-favorite zmdi-hc-lg" style={{ color: "red" }} />
      &nbsp;&nbsp; Liked
    </button>
  );
};
const ViewLikesButton = props => {
  return (
    <button type="button" className="jr-btn jr-flat-btn btn btn-default mb-0 px-3" onClick={props.onClick}>
      <h4 className="mb-0">
        {props.count}
        &nbsp; {props.count < 2 ? "Like" : "Likes"}
      </h4>
    </button>
  );
};

const AddCommentsButton = props => {
  return (
    <button type="button" className="jr-btn jr-flat-btn btn btn-default mb-0" onClick={props.onClick}>
      <i className="zmdi zmdi-comment-outline zmdi-hc-lg" style={{ color: "#aaaaaa" }} />
      &nbsp;&nbsp;Add Comments
    </button>
  );
};
const ViewCommentsButton = props => {
  return (
    <button type="button" className="jr-btn jr-flat-btn btn btn-default mb-0 px-3" onClick={props.onClick}>
      <h4 className="mb-0">
        {props.count}
        &nbsp; {props.count < 2 ? "Comment" : "Comments"}
      </h4>
    </button>
  );
};

const FollowButton = props => {
  return (
    <button className={`jr-btn jr-btn-default btn btn-default ${props.style} ${props.margin}`} onClick={props.onClick}>
      <h4 className="mb-0">Follow</h4>
    </button>
  );
};

const FollowOnButton = props => {
  return (
    <button className={`jr-btn jr-btn-default btn btn-default ${props.style} ${props.margin}`} onClick={props.onClick}>
      <div className="d-flex justify-content-center align-items-center">
        <i className="zmdi zmdi-check-circle zmdi-hc-lg mr-2 " />
        <h4 className="mb-0">Follow</h4>
      </div>
    </button>
  );
};

const HighlightButton = props => {
  return (
    <button
      className={`jr-btn jr-btn-default btn btn-default ${props.style} ${props.margin} px-0`}
      onClick={props.onClick}
    >
      <h4 className="mb-0">Highlight</h4>
    </button>
  );
};

const HighlightOnButton = props => {
  return (
    <button
      className={`jr-btn jr-btn-default btn btn-default ${props.style} ${props.margin} px-0`}
      onClick={props.onClick}
    >
      <div className="d-flex justify-content-center align-items-center">
        <i className="zmdi zmdi-check-circle zmdi-hc-lg mr-2 " />
        <h4 className="mb-0">Highlight</h4>
      </div>
    </button>
  );
};

const SaveProfileButton = props => {
  return (
    <button type="submit" className="jr-btn btn btn-primary rs-btn-primary-light mb-0">
      <i className="zmdi zmdi-upload zmdi-hc-lg" />
      &nbsp;&nbsp;Save
    </button>
  );
};

const FollowerCountButton = props => {
  return (
    <button className="jr-btn jr-btn-default btn btn-default profileInfoBtn" onClick={props.onClick}>
      {props.followerText}
    </button>
  );
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
  DeleteButtonBorder,
  LikeButton,
  LikedButton,
  AddCommentsButton,
  ViewCommentsButton,
  ViewLikesButton,
  MessageButton,
  StatsButton,
  FollowButton,
  HighlightButton,
  SaveProfileButton,
  FollowerCountButton,
  FollowOnButton,
  HighlightOnButton
};
