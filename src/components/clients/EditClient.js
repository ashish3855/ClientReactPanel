import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fb } from "../../firebase";

class EditClient extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInputfirstName = React.createRef();
    this.textInputlastName = React.createRef();
    this.textInputemail = React.createRef();
    this.textInputphone = React.createRef();
    this.textInputbalance = React.createRef();
  }

  onSubmit = (e, id) => {
    e.preventDefault();

    fb.database()
      .ref("clients/" + id)
      .set({
        firstName: this.textInputfirstName.current.value,
        lastName: this.textInputlastName.current.value,
        email: this.textInputemail.current.value,
        phone: this.textInputphone.current.value,
        balance:
          this.textInputbalance.current.value === ""
            ? 0
            : parseFloat(this.textInputbalance.current.value).toFixed(2)
      });

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
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fa fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={e => this.onSubmit(e, selectedUser[0].id)}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  minLength="2"
                  required
                  defaultValue={selectedUser[0].firstName}
                  ref={this.textInputfirstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  minLength="2"
                  required
                  defaultValue={selectedUser[0].lastName}
                  ref={this.textInputlastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  defaultValue={selectedUser[0].email}
                  ref={this.textInputemail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  minLength="10"
                  required
                  defaultValue={selectedUser[0].phone}
                  ref={this.textInputphone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  className="form-control"
                  name="balance"
                  defaultValue={selectedUser[0].balance}
                  ref={this.textInputbalance}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Update Record"
                  className="btn btn-primary btn-block"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clients: state.clients
  };
};

export default connect(mapStateToProps)(EditClient);
