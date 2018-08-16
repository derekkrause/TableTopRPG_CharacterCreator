import React from "react";
import { confirmUser } from "../../services/registerLogin.service";

class ConfirmationPage extends React.Component {
  state = {
    tokenId: ""
  };

  getToken = string => {
    let tokenId = string.slice(7);
    this.setState({ tokenId }, this.confirmRegistration(tokenId));
  };

  confirmRegistration = token => {
    let responseObject = { tokenId: token };
    confirmUser(responseObject)
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  componentDidMount() {
    //Grab the TokenId from URL
    let queryString = this.props.location.search;
    this.getToken(queryString);
  }

  render() {
    return <div />;
  }
}

export default ConfirmationPage;
