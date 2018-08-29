import React from "react";

class ChatMainContent extends React.Component {
  render() {
    const { message, currentUser, author, time, senderAvatar } = this.props;
    return (
      <React.Fragment>
        {author === currentUser.firstName ? (
          <div className="d-flex flex-nowrap chat-item flex-row-reverse">
            <img className="rounded-circle avatar size-40 align-self-end" src={currentUser.avatarUrl} />
            <div style={{ position: "relative", top: "20px" }}>
              <div className="bubble jambo-card" style={{ backgroundColor: "#2dcc6f", border: "none" }}>
                <div className="message" style={{ color: "white", fontSize: "15px" }}>
                  {message}
                </div>
              </div>
              <div className="time text-right mt-2" style={{ fontSize: "10px", marginRight: "16px" }}>
                {time}
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-nowrap chat-item" ref={this.registerRef}>
            <img className="rounded-circle avatar size-40 align-self-end" src={senderAvatar} />
            <div style={{ position: "relative", top: "20px" }}>
              <div className="bubble" style={{ backgroundColor: "rgb(220, 224, 225)", border: "none" }}>
                <div className="message" style={{ fontSize: "15px" }}>
                  {message}
                </div>
              </div>
              <div className="time text-muted text-left mt-2" style={{ fontSize: "10px", marginLeft: "16px" }}>
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
