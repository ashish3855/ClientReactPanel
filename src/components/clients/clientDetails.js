import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fb } from "../../firebase";

class clientDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBalanceUpdate: false,
      balanceUpdateAmt: "",
      amt: null
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateAmt = (e, user) => {
    e.preventDefault();

    fb.database()
      .ref("clients/" + user[0].id)
      .set({
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        phone: user[0].phone,
        balance: parseFloat(this.state.amt).toFixed(2)
      });

    this.props.history.push("/");
  };

  removeClient = (e, user) => {
    e.preventDefault();
    fb.database()
      .ref("clients/" + user[0].id)
      .remove();
    this.props.history.push("/");
  };

  render() {
    const { clients } = this.props;
    let selectedUser = [];
    if (clients.length) {
      selectedUser = clients.filter(
        client => this.props.match.params.id === client.id
      );
    }

    const updateForm = (
      <form onSubmit={e => this.updateAmt(e, selectedUser)}>
        <div class="form-group">
          <input
            type="text"
            name="amt"
            placeholder="Update Amount"
            onChange={this.handleChange}
            value={this.state.amt}
          />
          <input type="submit" value="Update" />
        </div>
      </form>
    );

    if (selectedUser.length) {
      return (
        <div>
          <Link to="/" className="btn btn-link">
            <i className="fa fa-arrow-circle-left" /> Back to Dashboard
          </Link>
          <div className="row">
            <div className="col-md-8">
              <h4>Client Details: </h4>
              <table className="table table-striped">
                <tr>
                  <td>
                    <strong>ClientId : </strong>
                  </td>
                  <td>{selectedUser[0].id} </td>
                </tr>
                <tr>
                  <td>
                    <strong>Name : </strong>
                  </td>
                  <td>
                    {selectedUser[0].firstName} {selectedUser[0].lastName}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Email : </strong>
                  </td>
                  <td>{selectedUser[0].email}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Phone : </strong>
                  </td>
                  <td>{selectedUser[0].phone}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Balance : </strong>
                  </td>
                  <td>
                    <strong className="text-secondary">$</strong>
                    {parseFloat(selectedUser[0].balance).toFixed(2)}
                    {this.props.disableBalanceOnEdit ? (
                      ""
                    ) : (
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          })
                        }
                      >
                        {" "}
                        <i className="fa fa-pencil" />{" "}
                      </a>
                    )}

                    {this.state.showBalanceUpdate ? updateForm : null}
                  </td>
                </tr>
              </table>
            </div>
            <div className="col-md-4">
              <h1>
                <Link
                  to={`/client/edit/${selectedUser[0].id}`}
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </Link>
                <div
                  className="btn btn-secondary btn-sm"
                  onClick={e => this.removeClient(e, selectedUser)}
                >
                  Delete
                </div>
              </h1>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <Link to="/" className="btn btn-link">
          <i className="fa fa-arrow-circle-left" /> Back to Dashboard
        </Link>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    clients: state.userReducer.clients,
    disableBalanceOnEdit: state.setting.settings.disableBalanceOnEdit
  };
};

export default connect(mapStateToProps)(clientDetails);
