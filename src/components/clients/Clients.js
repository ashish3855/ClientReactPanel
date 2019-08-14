import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fb } from "../../firebase";
import Spinner from "../layout/spinner";

class Clients extends Component {
  state = {
    totalOwed: null
  };

  componentDidMount() {
    const clientRef = fb.database().ref("clients/");

    clientRef.on("value", snapshot => {
      const allClients = snapshot.val();
      const clients = [];

      let total = 0;
      for (let key in allClients) {
        total += parseFloat(allClients[key].balance);
        const client = {
          ...allClients[key],
          id: key
        };
        clients.push(client);
      }

      this.setState({
        totalOwed: total.toFixed(2)
      });

      this.props.clientsadd(clients);
    });
  }

  render() {
    console.log("i ran");
    if (this.props.clients.length !== 0) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fa fa-users" aria-hidden="true" /> Clients
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Owed (Amount) $
                <span className="text-primary">{this.state.totalOwed}</span>
              </h5>
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>$ {parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fa fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

const mapStateToProps = state => {
  return {
    clients: state.clients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clientsadd: clients => dispatch({ type: "CLIENTSADD", payload: clients })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients);
