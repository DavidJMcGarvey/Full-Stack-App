import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Individual course module component 
export default class Course extends Component {
  render() {
    const title = this.props.title;
    const idURL = `/courses/${this.props.id}`;
    return (
      <div className="grid-33"><Link className="course--module course--link" to={idURL} >
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{title}</h3>
      </Link></div>
    )
  }
}