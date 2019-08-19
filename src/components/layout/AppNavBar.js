import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class AppNavBar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logoutclient();
    this.props.history.push("/client/login");
  };

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-secondary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Client Panel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarMain"
            style={{ position: "relative" }}
          >
            <ul className="navbar-nav mr-auto">
              {this.props.userInfo ? (
                <React.Fragment>
                  <li>
                    <Link to="/" className="nav-link">
                      Dashboard
                    </Link>
                  </li>{" "}
                  <li className="nav-item" style={{ display: "inline-block" }}>
                    <Link className="nav-link" to="/settings">
                      Settings
                    </Link>
                  </li>
                </React.Fragment>
              ) : (
                ""
              )}

              {!this.props.userInfo ? (
                <React.Fragment>
                  <li className="nav-item">
                    <Link to="/client/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/client/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                </React.Fragment>
              ) : (
                <ul
                  style={{
                    position: "absolute",
                    right: 0,
                    listStyle: "none"
                  }}
                >
                  <li
                    className="nav-item"
                    style={{ display: "inline-block", color: "white" }}
                  >
                    Welcome {this.props.userInfo}
                  </li>
                  <li className="nav-item" style={{ display: "inline-block" }}>
                    <Link className="nav-link" onClick={e => this.logout(e)}>
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userReducer.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutclient: () => dispatch({ type: "LOGOUTCLIENT", payload: null })
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppNavBar)
);
