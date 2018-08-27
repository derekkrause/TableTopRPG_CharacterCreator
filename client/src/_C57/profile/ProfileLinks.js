import React from "react";
import { getAllIcons } from "../../services/icon.service";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

class ProfileLinks extends React.Component {
  state = {
    linkIcon: null,
    icon: []
  };

  componentDidMount() {
    getAllIcons().then(icon => {
      console.log(icon);
      let info = icon.data.resultSets[0];
      this.setState({
        icon: info
      });
    });
  }

  handleChange = e => {
    let val = e.target.value;
    this.setState({
      linkIcon: val
    });
  };

  render() {
    return (
      <div>
        {/* <form> */}
        <div className="row ml-4">
          <div className="">
            <UncontrolledDropdown>
              <DropdownToggle caret>
                {this.state.linkIcon ? (
                  <React.Fragment>
                    <i className={this.state.linkIcon} />
                  </React.Fragment>
                ) : (
                  <span>Profile Link Icon</span>
                )}
              </DropdownToggle>
              <DropdownMenu name="linkIcon" value={this.state.linkIcon} onClick={this.handleChange}>
                <DropdownItem header>Icon to display</DropdownItem>
                <DropdownItem header>next to your link</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>None</DropdownItem>
                {this.state.icon !== [] && (
                  <React.Fragment>
                    {console.log(this.state.icon)}
                    {this.state.icon.map(icon => (
                      <DropdownItem key={icon.Id} value={icon.Icon}>
                        <i className={icon.Icon} />
                        {icon.IconName}
                      </DropdownItem>
                    ))}
                  </React.Fragment>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>

            <label className="px-2" htmlFor="link">
              Link:
            </label>
            <input type="text" id="link" onChange={this.props.handleOnChange} name="link" value={this.props.link} />
            <label className="px-2" htmlFor="linkTitle">
              Link Title:
            </label>
            <input
              className="mr-2"
              type="text"
              id="linkTitle"
              onChange={this.props.handleOnChange}
              name="linkTitle"
              value={this.props.linkTitle}
            />
            <button className="btn btn-success" type="button" onClick={this.handleAddVideoToPreview}>
              <i className="zmdi zmdi-check zmdi-hc-lg" />
            </button>
            <button className="btn btn-secondary" type="button" onClick={this.handleOnclickVideoLink}>
              <i className="zmdi zmdi-close zmdi-hc-lg" />
            </button>
          </div>
        </div>
        {/* </form> */}
      </div>
    );
  }
}

export default ProfileLinks;
