import React from "react";
import { Button, Table } from "reactstrap";
import { NavLink, withRouter } from "react-router-dom";
import ConfigTableCells from "./ConfigTableCells";
import { CreateButton } from "../../CustomComponents/Button";
import { getAllConfig } from "../../../services/config.service";

class ConfigTable extends React.Component {
  state = {
    key: "",
    Value: "",
    configItems: []
  };

  componentDidMount() {
    console.log("Config Table Component Mounted");
    this.getAllConfig();
  }

  getAllConfig = () => {
    getAllConfig()
      .then(response => {
        console.log("getAllConfig:", response.data.item.resultSets[0]);
        this.setState({ configItems: response.data.item.resultSets[0] });
      })
      .catch(error => {
        console.log("getAllConfig: Ajax Request failed!");
        console.log(error);
      });
  };

  render() {
    const { configItems } = this.state;
    return (
      <div>
        <NavLink className="float-right" to={`${this.props.match.url}/create`}>
          <CreateButton />
        </NavLink>
        <h3 style={{ textAlign: "center" }}>Configuration List</h3>
        <Table className="table-middle table float-left ">
          <tbody>
            <tr>
              {/* <th>Id</th> */}
              <th>Key</th>
              <th>Value</th>
            </tr>
            {configItems.map(config => {
              return <ConfigTableCells key={config.Id} config={config} {...this.props} />;
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default withRouter(ConfigTable);
