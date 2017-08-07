import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
  handleOnClickSignout(e) {
    e.preventDefault();
    this.props.signout();
  }

  renderNav() {
    if (this.props.authenticated || localStorage.getItem('token')) {
      return (
        <div className="navbar-nav">
          <Link className="nav-item nav-link" onClick={this.handleOnClickSignout.bind(this)}>SignOut</Link>
          <Link className="nav-item nav-link" to="/addFriend">Add a Mate</Link>
          <Link className="nav-item nav-link" to="/friendRequest">Mates Request</Link>
        </div>
      );
    }
  
    return (
      <div className="navbar-nav">
        <Link className="nav-item nav-link" to="signin">SignIn</Link>
        <Link className="nav-item nav-link" to="signup">SignUp</Link>
      </div>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-toggleable-sm navbar-inverse bg-primary">
        <Link className="navbar-brand" to="/">Mates</Link>
        <div className="collapse navbar-collapse">
          {this.renderNav()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.state_user.authenticated
  }
}

export default connect(mapStateToProps, actions)(Header);