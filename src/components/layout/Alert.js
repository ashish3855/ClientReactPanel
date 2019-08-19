import React, { Component } from "react";

class Alert extends Component {
  render() {
    return (
      <div>
        {this.props.alertMessage ? (
          <div className="alert alert-danger">{this.props.alertMessage}</div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Alert;
