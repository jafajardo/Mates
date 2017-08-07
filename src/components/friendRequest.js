import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getMates,
  getMateRequests,
  approveMate
} from '../actions';
import MateRequestsSelector from '../selectors/selector_mateRequests';

class FriendRequest extends Component {
  componentWillMount() {
    const { getMates, getMateRequests } = this.props;
    getMates(localStorage.getItem('id'));
    getMateRequests(localStorage.getItem('id'));
  }

  handleApproveMateClick = (approvedID) => {
    const { approveMate } = this.props;
    console.log(approvedID);
    approveMate(localStorage.getItem('id'), approvedID);
  }

  renderMateRequests = () => {
    const { mateRequests } = this.props;
    
    return (
      mateRequests.map(request => {
        return (
          <li className="list-group-item" key={request._id}>
            {request.name}
            <span><button className="btn btn-sm btn-primary" onClick={this.handleApproveMateClick.bind(this, request._id)}>Approve Mate</button></span>
          </li>
        )
      })
    );
  }

  render() {
    return (
      <section>
        <div className="container">
          <ul className="list-group">
            {this.renderMateRequests()}
          </ul>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({state_mates}) => {
  return {
    mateRequests: MateRequestsSelector(state_mates)
  }
}

export default connect(mapStateToProps, { getMates, getMateRequests, approveMate })(FriendRequest);