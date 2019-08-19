import React, { Component } from "react";
import { fb } from "../../firebase";
import "firebase/auth";
import { connect } from "react-redux";
import Alert from "../layout/Alert";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    fb.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this.props.userInfo(res.user.providerData[0].email);
        this.setState({
          email: "",
          password: ""
        });

        this.props.history.push("/");
      })
      .catch(error => {
        this.props.notifyUser({
          messageType: "error",
          message: "Username / Password is wrong"
        });
        setTimeout(() => {
          this.props.removeMsg();
        }, 3000);
      });
  };

  render() {
    return (
      <div>
        <div className="col-md-6 mx-auto">
          <div className="text-center">
            {" "}
            <h1>
              <i className="fa fa-lock" /> Login
            </h1>{" "}
          </div>
          <form onSubmit={this.onSubmit}>
            <Alert alertMessage={this.props.message} />
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                minLength="2"
                required
                placeholder="Email"
                onChange={this.onChange}
                value={this.state.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                minLength="2"
                required
                placeholder="Password"
                onChange={this.onChange}
                value={this.state.password}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Login"
                className="btn btn-primary btn-block"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.notify.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userInfo: email => dispatch({ type: "USERINFO", email: email }),
    notifyUser: notifymessage =>
      dispatch({ type: "NOTIFY_USER", payload: notifymessage }),
    removeMsg: () => dispatch({ type: "REMOVEMSG", payload: null })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
