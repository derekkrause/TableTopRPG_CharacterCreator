import React from "react";
//import SweetAlert from "react-bootstrap-sweetalert";
import PropTypes from "prop-types";
import {
  getCommentById,
  getCommentsByPostId,
  getCommentsByEventId,
  getCommentsByMediaId,
  postComment,
  editComment,
  deleteComment
} from "../../services/comment.service";
import CommentThread from "./CommentThread";
import { connect } from "react-redux";

class CommentsContainer extends React.Component {
  state = {
    //postId: 5,
    //eventId: 0,
    //mediaId: 0,
    comments: [],
    newComment: "",
    showReplyInput: false,
    currentReply: null,
    showAll: false
    //alert: null
  };

  toggleShowAll = e => {
    e.preventDefault();
    this.setState({
      showAll: !this.state.showAll
    });
  };

  renderComments = () => {
    let commentArray = [];
    let rootCommentCount = 0;
    getCommentsByPostId(this.props.postId).then(response => {
      // console.log("GET Comments", response);
      if (response.data.length > 0) {
        response.data.map(post => {
          let elapsedTime = Math.round((new Date() - new Date(post.dateCreated)) / 1000 / 60);
          let timeStamp;
          if (elapsedTime < 1) {
            timeStamp = "1min";
          } else if (elapsedTime < 60) {
            timeStamp = `${elapsedTime}mins`;
          } else if (elapsedTime < 90) {
            timeStamp = "1hr";
          } else if (elapsedTime < 1440) {
            let hrsTime = Math.round(elapsedTime / 60);
            timeStamp = `${hrsTime}hrs`;
          } else if (elapsedTime < 2160) {
            timeStamp = "1day";
          } else if (elapsedTime < 43200) {
            let daysTime = Math.round(elapsedTime / 1440);
            timeStamp = `${daysTime}days`;
          } else if (elapsedTime < 64800) {
            timeStamp = "1mon";
          } else if (elapsedTime < 518400) {
            let monsTime = Math.round(elapsedTime / 43200);
            timeStamp = `${monsTime}mons`;
          } else if (elapsedTime < 1036800) {
            timeStamp = "1yr";
          } else {
            let yrsTime = Math.round(elapsedTime / 518400);
            timeStamp = `${yrsTime}yrs`;
          }
          let comment = {
            postId: post.parentPost,
            commentId: post.id,
            parentComment: post.parentComment,
            user: post.userId,
            username: post.firstName + " " + post.lastName,
            userAvatar: post.avatarUrl,
            dateCreated: timeStamp,
            comment: post.comment
          };
          if (comment.parentComment === null) {
            rootCommentCount++;
          }
          commentArray.push(comment);
        });
        for (let i = 0; i < commentArray.length; i++) {
          if (commentArray[i].parentComment === null) {
            commentArray[i].commentKey = rootCommentCount;
            rootCommentCount--;
          }
        }
        this.setState({
          comments: commentArray
        });
      }
    });
  };

  addComment = () => {
    if (this.state.newComment.length > 0) {
      let commentPayload = {
        userId: this.props.currentUser.id,
        parentPost: this.props.postId,
        parentComment: this.state.currentReply,
        comment: this.state.newComment
      };
      postComment(commentPayload).then(response => {
        // console.log(response);
        this.setState(
          {
            showReplyInput: false,
            currentReply: null,
            newComment: ""
          },
          this.renderComments()
        );
      });
    }
  };

  handleCommentChange = e => {
    let val = e.target.value;
    this.setState({
      newComment: val
    });
  };

  // confirmDelete = e => {
  //   e.preventDefault();
  //   const getAlert = () => (
  //     <SweetAlert
  //       warning
  //       showCancel
  //       confirmBtnText="Yes, delete it!"
  //       confirmBtnBsStyle="danger"
  //       cancelBtnBsStyle="default"
  //       title="Are you sure you want to delete your comment?"
  //       onConfirm={this.removeComment}
  //       onCancel={this.cancelDelete}
  //     />
  //   );
  //   this.setState({ alert: getAlert() });
  // };

  // cancelDelete = () => {
  //   this.setState({ alert: null });
  // };

  removeComment = e => {
    e.preventDefault();
    let commentKeys = e.target.name.split(" ");
    // console.log("keys", commentKeys);
    let commentId = parseInt(commentKeys[0]);
    let parentCommentId = parseInt(commentKeys[1]) || null;
    let hasReplies = false;
    for (let i = 0; i < this.state.comments.length; i++) {
      if (commentId === this.state.comments[i].parentComment) {
        let comment = {
          id: commentId,
          userId: this.props.currentUser.id,
          parentPost: this.props.postId,
          parentComment: parentCommentId,
          comment: "Content removed by author.",
          removed: true
        };
        editComment(comment).then(response => {
          console.log("Content Removed", response);
          this.renderComments();
        });
        hasReplies = true;
        break;
      }
    }
    if (!hasReplies) {
      deleteComment(commentId).then(response => {
        // console.log("DELETE", response);
        this.renderComments();
      });
    }
  };

  showReply = e => {
    e.preventDefault();
    // console.log(e.target.name);

    let replyKey = parseInt(e.target.name);
    if (!this.state.showReplyInput) {
      this.setState({
        currentReply: replyKey,
        showReplyInput: !this.state.showReplyInput
      });
    } else {
      this.setState({
        currentReply: null,
        showReplyInput: !this.state.showReplyInput
      });
    }
  };

  componentDidMount() {
    this.renderComments();
  }

  render() {
    return (
      <div>
        <CommentThread
          renderComments={this.renderComments}
          comments={this.state.comments}
          currentUser={this.props.currentUser}
          addComment={this.addComment}
          showReplyInput={this.state.showReplyInput}
          currentReply={this.state.currentReply}
          showReply={this.showReply}
          handleCommentChange={this.handleCommentChange}
          newComment={this.state.newComment}
          removeComment={this.removeComment}
          showAll={this.state.showAll}
          toggleShowAll={this.toggleShowAll}
          //confirmDelete={this.confirmDelete}
        />
      </div>
    );
  }
}

CommentsContainer.propTypes = {
  postId: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(CommentsContainer);
