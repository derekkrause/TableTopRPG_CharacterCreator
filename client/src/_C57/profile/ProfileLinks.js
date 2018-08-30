import React from "react";
import { getAllIcons } from "../../services/icon.service";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import "./ProfileLinks.css";

class ProfileLinks extends React.Component {
  state = {
    linkIcon: null,
    linkIconId: null,
    icon: []
  };

  componentDidMount() {
    getAllIcons().then(icon => {
      let info = icon.data.resultSets[0];
      this.setState(
        {
          icon: info
        },
        () => console.log(this.state.icon)
      );
    });
  }

  handleChange = e => {
    let val = e.target.value;
    const newIcon = this.state.icon.filter(item => item.Id == val);
    console.log(newIcon, val);
    this.setState({
      linkIconId: newIcon[0].Id,
      linkIcon: newIcon[0]
    });
  };

  postAthleteLink = (e, icon) => {
    e.preventDefault();
    this.props.postLinks(parseInt(icon));
  };

  render() {
    return (
      <div>
        <form onSubmit={e => this.postAthleteLink(e, this.state.linkIconId)}>
          <div className="row col-md-12 px-0 mx-0" style={{ display: "flex", alignItems: "center" }}>
            <div className="row col-auto px-3">
              <UncontrolledDropdown>
                <DropdownToggle caret>
                  {this.state.linkIcon ? (
                    <React.Fragment>
                      <i className={this.state.linkIcon.Icon} />
                    </React.Fragment>
                  ) : (
                    <span>Profile Link Icon</span>
                  )}
                </DropdownToggle>
                <DropdownMenu
                  name="linkIcon"
                  onClick={this.handleChange}
                  modifiers={{
                    setMaxHeight: {
                      enabled: true,
                      order: 890,
                      fn: data => {
                        return {
                          ...data,
                          styles: {
                            ...data.styles,
                            overflow: "auto",
                            maxHeight: 250
                          }
                        };
                      }
                    }
                  }}
                >
                  <DropdownItem value={null}>None</DropdownItem>
                  {this.state.icon !== [] && (
                    <React.Fragment>
                      {this.state.icon.map(icon => (
                        <DropdownItem key={icon.Id} value={icon.Id}>
                          <i className={icon.Icon} />
                          {icon.IconName}
                        </DropdownItem>
                      ))}
                    </React.Fragment>
                  )}
                </DropdownMenu>
              </UncontrolledDropdown>
              Icon to display next to your hyperlink.
            </div>
          </div>
          <div className="row col-auto pl-3 px-0 ">
            <label className="pr-2">Link:</label>
          </div>
          <div className="row">
            <input
              className="mx-3"
              type="text"
              id="link"
              style={{ width: "100%" }}
              title="Make sure you have http(s):// at the start of your URL"
              pattern="^https?:\/\/[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+$"
              required={true}
              onChange={this.props.handleOnChange}
              name="link"
              value={this.props.link}
            />
          </div>
          <div className="row col-auto pl-3 pt-3 px-0">
            <label className="pr-2">Description:</label>
          </div>
          <div className="row">
            <input
              className="mx-3"
              style={{ width: "100%" }}
              type="text"
              id="linkTitle"
              onChange={this.props.handleOnChange}
              name="linkTitle"
              value={this.props.linkTitle}
            />
          </div>
          <div className="text-right mt-2">
            <button className="btn btn-success" type="submit">
              <i className="zmdi zmdi-check zmdi-hc-lg" />
            </button>
            <button className="btn btn-secondary" type="button">
              <i className="zmdi zmdi-close zmdi-hc-lg" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ProfileLinks;
