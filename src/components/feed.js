import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions'

class Feed extends Component {
  componentWillMount = () => {
    this.props.retrieveFeeds();
  }

  renderFeeds = () => {
    const arrayFeeds = _.values(this.props.feeds);

    return (
      arrayFeeds.map(feed => <li className="list-group-item" key={feed.id}>{feed.comment}</li>)
    );
  }

  render() {
    return (
      <section className="container">
        <ul className="list-group">
          {this.renderFeeds()}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = ({state_feed}) => {
  return {
    feeds: state_feed.feeds
  }
}

export default connect(mapStateToProps, actions)(Feed);