import React, { Component } from "react";
import { fb } from "../../firebase";
import "firebase/auth";
import { connect } from "react-redux";

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
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
      })
      .then(res => {
        this.props.userInfo(res.user.providerData[0].email);
      });
    // const user = fb.auth().currentUser;
    // if (user) {
    //   console.log("user Logged in!", user);
    // } else {
    //   console.log("Something Wrong!");
    // }
    this.setState({
      email: "",
      password: ""
    });
    this.props.history.push("/");
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

const mapDispatchToProps = dispatch => {
  return {
    userInfo: email => dispatch({ type: "USERINFO", email: email })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
