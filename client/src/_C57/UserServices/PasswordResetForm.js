import React from "react";
import "./PasswordReset.css";
import IntlMessages from "util/IntlMessages";

class ForgotPassword extends React.Component {
  render() {
    return (
      <div className="col-md-4 container jr-card mt-3 d-flex justify-content-center align-items-center ">
        <div className="forgotPasswordContent">
          <div className="mb-2">
            <h2>
              <IntlMessages id="appModule.forgotPassword" />
            </h2>
          </div>

          <div className="login-form">
            <form>
              <div className="pb-2">
                <input
                  required
                  type="email"
                  placeholder="Your Email"
                  className="mt-0 mb-4  form-control form-control-lg"
                />
              </div>
              <div className="pt-3">
                <IntlMessages id="appModule.dntRememberEmail" /> &nbsp;
                <a className="small" href="javascript:void(0)">
                  <IntlMessages id="appModule.contactSupport" />
                </a>
                <button className="btn btn-primary float-right mb-3" type="button">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
