import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Settings extends Component {
  allowRegistrationChange = () => {
    const registerToggle = this.props.settings.allowRegistration;
    this.props.allowRegistration(!registerToggle);
  };
  disableBalanceOnAddChange = () => {
    const balanceAddToggle = this.props.settings.disableBalanceOnAdd;
    this.props.disableBalanceOnAdd(!balanceAddToggle);
  };
  disableBalanceOnEditChange = () => {
    const balanceEditToggle = this.props.settings.disableBalanceOnEdit;
    this.props.disableBalanceOnEdit(!balanceEditToggle);
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fa fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Edit Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registration</label>{" "}
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={this.props.settings.allowRegistration}
                  onChange={this.allowRegistrationChange}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance on Add</label>{" "}
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  checked={this.props.settings.disableBalanceOnAdd}
                  onChange={this.disableBalanceOnAddChange}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance on Edit</label>{" "}
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  checked={this.props.settings.disableBalanceOnEdit}
                  onChange={this.disableBalanceOnEditChange}
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
    settings: state.setting.settings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allowRegistration: reg =>
      dispatch({ type: "ALLOW_REGISTRATION", payload: reg }),
    disableBalanceOnAdd: add =>
      dispatch({ type: "DISABLEBALANCEONADD", payload: add }),
    disableBalanceOnEdit: edit =>
      dispatch({ type: "DISABLEBALANCEONEDIT", payload: edit })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
