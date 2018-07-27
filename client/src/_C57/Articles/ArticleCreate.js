import React from "react";
import {
  Button,
  ButtonDropdown,
  ButtonGroup,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  IconFlatButtonGroup,
  Navbar
} from "reactstrap";
import "./ArticlePage.css";

class ArticleCreate extends React.Component {
  render() {
    return (
      <div className="container container-fluid myContainer justify-content-center">
        <Navbar className="bg-white justify-content-center align-items-center px-3 sticky-top border-bottom border-light rounded">
          <span>Article Wizard</span>
          <span id="toolbox" className="cke_top cke_reset_all mx-auto">
            <ButtonGroup>
              <ButtonGroup className="border-right border-gray">
                <Button
                  className="jr-btn jr-flat-btn btn-lg py-1 px-2 text-lowercase"
                  color="default"
                  tag="button"
                  title="Header 1">
                  <strong>h1</strong>
                </Button>
                <Button
                  className="jr-btn jr-flat-btn btn-lg py-1 px-2 text-lowercase"
                  color="default"
                  tag="button"
                  title="Header 2">
                  <strong>h2</strong>
                </Button>
                <Button
                  className="jr-btn jr-flat-btn btn-lg py-1 px-2 text-lowercase"
                  color="default"
                  tag="button"
                  title="Normal Text Size">
                  normal
                </Button>
              </ButtonGroup>
              <ButtonGroup className="border-right border-gray">
                <Button className="jr-btn jr-flat-btn btn-lg py-1 px-2" color="default" tag="button" title="Bold">
                  <i className="zmdi zmdi-format-bold zmdi-hc-lg" />
                </Button>
                <Button className="jr-btn jr-flat-btn btn-lg py-1 px-2" color="default" tag="button" title="Italics">
                  <i className="zmdi zmdi-format-italic zmdi-hc-lg" />
                </Button>
                <Button className="jr-btn jr-flat-btn btn-lg py-1 px-2" color="default" tag="button" title="Underline">
                  <i className="zmdi zmdi-format-underlined zmdi-hc-lg" />
                </Button>
              </ButtonGroup>
              <ButtonGroup className="border-right border-gray">
                <Button
                  className="jr-btn jr-flat-btn btn-lg py-1 px-2"
                  color="default"
                  tag="button"
                  title="Numbered List">
                  <i className="zmdi zmdi-format-list-numbered zmdi-hc-lg" />
                </Button>
                <Button
                  className="jr-btn jr-flat-btn btn-lg py-1 px-2"
                  color="default"
                  tag="button"
                  title="Bulleted List">
                  <i className="zmdi zmdi-format-list-bulleted zmdi-hc-lg" />
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button className="jr-btn jr-flat-btn btn-lg py-1 px-2" color="default" tag="button" title="Quote">
                  <i className="zmdi zmdi-quote zmdi-hc-lg" />
                </Button>
                <Button className="jr-btn jr-flat-btn btn-lg py-1 px-2" color="default" tag="button" title="Add Link">
                  <i className="zmdi zmdi-link zmdi-hc-lg" />
                </Button>
                <Button className="jr-btn jr-flat-btn btn-lg py-1 px-2" color="default" tag="button" title="Add Image">
                  <i className="zmdi zmdi-image zmdi-hc-lg" />
                </Button>
              </ButtonGroup>
            </ButtonGroup>
          </span>
          <Button className="jr-btn jr-flat-btn btn-lg py-1 px-2" color="default" tag="button" title="Erase All">
            <i className="zmdi zmdi-delete zmdi-hc-2x" />
          </Button>
        </Navbar>
        <div
          className="container articleFormArea bg-white border-1 my-3 mx-auto rounded"
          contentEditable="true"
          autoCorrect="true"
          style={{ backgroundSize: "cover" }}>
          Lots of stuff
        </div>
      </div>
    );
  }
}

export default ArticleCreate;
