import React from "react";

class ChatMainHeader extends React.Component {
  state = {
    status: "away"
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.activeUsers[nextProps.activeChatId]) {
      return { status: "online" };
    } else {
      return { status: "away" };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activeUsers !== this.props.activeUsers) {
      if (this.props.activeUsers[this.props.activeChatId]) {
        this.setState({ status: "online" });
      } else {
        this.setState({ status: "away" });
      }
    }
  }

  render() {
    const { status } = this.state;
    const { recipientAvatar, recipientName, messagesToShow } = this.props;

    return (
      <React.Fragment>
        {messagesToShow ? (
          <h1 style={{ textAlign: "center" }}>There are no messages to display!</h1>
        ) : (
          <div className="chat-main-header-info">
            <div className="chat-avatar mr-2">
              <div className="chat-avatar-mode">
                <img src={recipientAvatar} className="rounded-circle size-60" alt="" />
                <span className={`chat-mode ${status}`} />
              </div>
            </div>
            <div className="chat-contact-name">{recipientName}</div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ChatMainHeader;
