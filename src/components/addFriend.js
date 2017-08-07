import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getMates,
  addMateRequest
} from '../actions';

class AddFriend extends Component {
  componentWillMount() {
    const { logged_in_mate } = this.props;
    this.props.getMates(localStorage.getItem('id'));
  }

  handleAddMateClick = (key) => {
    const { logged_in_mate } = this.props;
    this.props.addMateRequest({ requestedBy: logged_in_mate._id, mateRequest: key });
  }

  renderMates = () => {
    const { mates } = this.props;

    if (!mates) {return <div className="text-center">Loading mates...</div>}

    return (
      mates.map(mate => {
        return (
          <li className="list-group-item" key={mate._id}>
            {mate.name}
            <button className="btn btn-sm btn-primary" onClick={this.handleAddMateClick.bind(this, mate._id)}>Add Matey</button>
          </li>
        )
      })
    );
  }

  render = () => {
    return (
      <section>
        <div className="container">
          <ul className="list-group">
            {this.renderMates()}
          </ul>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mates: state.state_mates.mates,
    logged_in_mate: state.state_mates.logged_in_mate
  }
}
export default connect(mapStateToProps, {getMates, addMateRequest})(AddFriend);