import React from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState, RichUtils } from "draft-js";
import { Button, ButtonGroup, Navbar } from "reactstrap";
import "./ArticlePage.css";

class ArticleCreate extends React.Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  onChange = editorState => {
    this.setState({ editorState });
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  addInlineStyle = style => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  };

  addBlockType = style => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, style));
  };

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
                  onClick={() => this.addBlockType("header-one")}
                  title="Header 1"
                >
                  <strong>h1</strong>
                </Button>
                <Button
                  className="jr-btn jr-flat-btn btn-lg py-1 px-2 text-lowercase"
                  color="default"
                  tag="button"
                  onClick={() => this.addBlockType("header-two")}
                  title="Header 2"
                >
                  <strong>h2</strong>
                </Button>
                <Button
                  className="jr-btn jr-flat-btn btn-lg py-1 px-2 text-lowercase"
                  color="default"
                  tag="button"
                  onClick={() => this.addBlockType("unstyled")}
                  title="Normal Text Size"
                >
                  normal
                </Button>
              </ButtonGroup>
              <ButtonGroup className="border-right border-gray">
                <Button
                  className="jr-btn jr-flat-btn btn-lg py-1 px-2"
                  color="default"
                  // onClick={() => this.addStyle("bold")}
                  onClick={() => this.addInlineStyle("BOLD")}
                  tag="button"
                  title="Bold"
                >
                  <i className="zmdi zmdi-format-bold zmdi-hc-lg" />
                </Button>
                <Button
                  className="jr-btn jr-flat-btn btn-lg py-1 px-2"
                  color="default"
                  tag="button"
                  onClick={() => this.addInlineStyle("ITALIC")}
                  title="Italics"
                >
                  <i className="zmdi zmdi-format-italic zmdi-hc-lg" />
                </Button>
                <Button
                  className="jr-btn jr-flat-btn btn-lg py-1 px-2"
                  color="default"
                  tag="button"
                  onClick={() => this.addInlineStyle("UNDERLINE")}
                  title="Underline"
                >
                  <i className="zmdi zmdi-format-underlined zmdi-hc-lg" />
                </Button>
              </ButtonGroup>
              <ButtonGroup className="border-right border-gray">
                <Button
                  className="jr-btn jr-flat-btn btn-lg py-1 px-2"
                  color="default"
                  tag="button"
                  onClick={() => this.addBlockType("ordered-list-item")}
                  title="Numbered List"
                >
                  <i className="zmdi zmdi-format-list-numbered zmdi-hc-lg" />
                </Button>
                <Button
                  className="jr-btn jr-flat-btn btn-lg py-1 px-2"
                  color="default"
                  tag="button"
                  onClick={() => this.addBlockType("unordered-list-item")}
                  title="Bulleted List"
                >
                  <i className="zmdi zmdi-format-list-bulleted zmdi-hc-lg" />
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button
                  className="jr-btn jr-flat-btn btn-lg py-1 px-2"
                  color="default"
                  tag="button"
                  onClick={() => this.addBlockType("blockquote")}
                  title="Quote"
                >
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
        <div className="container bg-white border-1 my-3 mx-auto rounded" style={{ backgroundSize: "cover" }}>
          <div className="p-2">
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleCreate;
