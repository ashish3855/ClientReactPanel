import React, { Component } from "react";
import { fb } from "../../firebase";
import "firebase/auth";

class Register extends Component {
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
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
      });
    this.setState({
      email: "",
      password: ""
    });
  };

  render() {
    return (
      <div>
        <div className="col-md-6 mx-auto">
          <div className="text-center">
            {" "}
            <h1>
              <i className="fa fa-user" /> Register
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
                value="Register"
                className="btn btn-primary btn-block"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
