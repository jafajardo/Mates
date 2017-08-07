import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }
  }

  handleCommentChange = (e)  => {
    this.setState((prevState, props) => {
      return { comment: props.values.comment }
    });
  }

  handleSubmitComment = (e) => {
    this.props.submitComment(this.state.comment);
  }

  render() {
    const { handleSubmit, fields: {comment} } = this.props;

    return (
      <section className="container">
        <form className="form-group">
          <label htmlFor="whats-on-your-mind">What's on your mind?</label>
          <textarea className="form-control" id="whats-on-your-mind" rows="3" onChangeCapture={this.handleCommentChange} value={this.state.comment} {...comment} />
          { comment.touched && comment.error && <div className="alert alert-danger">{comment.error}</div> }
          <button className="btn btn-sm btn-primary w-100" onClick={handleSubmit(this.handleSubmitComment)}>Submit</button>
        </form>
      </section>
    );
  }
}

const validate = (formProps) => {
  const errors = {}

  if(!formProps.comment) {
    errors.comment = 'Comment is required';
  }

  return errors;
}

export default reduxForm({
  form: 'comment',
  fields: ['comment'],
  validate
}, null, actions)(Comment);