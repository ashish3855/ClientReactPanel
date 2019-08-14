import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class AppNavBar extends Component {
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
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
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
                    {this.props.userInfo}
                  </li>

                  <li className="nav-item" style={{ display: "inline-block" }}>
                    <Link to="/client/logout" className="nav-link">
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
    userInfo: state.userInfo
  };
};

export default connect(mapStateToProps)(AppNavBar);
