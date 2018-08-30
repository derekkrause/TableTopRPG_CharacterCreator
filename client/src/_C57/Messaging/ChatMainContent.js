import React from "react";
import "./message.css";

class ChatMainContent extends React.Component {
  render() {
    const { message, currentUser, author, time, senderAvatar } = this.props;
    return (
      <React.Fragment>
        {author === currentUser.firstName ? (
          <div className="d-flex flex-wrap chat-item flex-row-reverse">
            <div
              className="senderBubble"
              style={{
                position: "relative",
                top: "20px",
                overflow: "hidden"
              }}
            >
              <div
                className="bubble flex-wrap"
                style={{
                  backgroundColor: "#2dcc6f",
                  border: "none",
                  overflowWrap: "break-word",
                  marginLeft: "0"
                }}
              >
                <span className="message" style={{ color: "white", fontSize: "15px" }}>
                  {message}
                </span>
              </div>
              <div className="time text-right mt-2" style={{ fontSize: "10px", paddingBottom: "7%" }}>
                {time}
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-wrap chat-item" ref={this.registerRef}>
            <img className="rounded-circle avatar size-40 align-self-end" src={senderAvatar} />
            <div
              className="recipientBubble"
              style={{ position: "relative", top: "20px", left: "2%", overflow: "hidden" }}
            >
              <div
                className="bubble flex-wrap"
                style={{ backgroundColor: "rgb(220, 224, 225)", border: "none", overflowWrap: "break-word" }}
              >
                <span className="message" style={{ fontSize: "15px" }}>
                  {message}
                </span>
              </div>
              <div className="time text-muted text-left mt-2" style={{ fontSize: "10px", paddingBottom: "7%" }}>
                {time}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ChatMainContent;
