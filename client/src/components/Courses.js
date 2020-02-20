import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Course from './Course';

export default class Courses extends Component {
  constructor() {
    super()
    this.state = {
      courses: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/courses')
      .then(res => {
        this.setState({
          courses: res.data.courses
        });
      })
      .catch(err => {
        console.log('Error fetching data from REST API', err)
      })
  }

  render() {
    let courseList = this.state.courses;
    let courses = courseList.map( course => 
      <Course 
        id={course.id}
        key={course.id.toString() + 1}
        title={course.title}
      />
    );
    return (
      <div>
        <div className="bounds">
          <ul>
            {courses}
          </ul>
          <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
          <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Course</h3>
          </Link></div>
        </div>
      </div>
      
    )
  }

}

