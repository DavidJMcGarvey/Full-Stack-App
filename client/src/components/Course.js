import React, { Component } from 'react';

export default class Course extends Component {
  render() {
    return (
      <div className="grid-33"><a className="course--module course--link" href="course-detail.html">
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{this.props.title}</h3>
      </a></div>
    )
  }
}