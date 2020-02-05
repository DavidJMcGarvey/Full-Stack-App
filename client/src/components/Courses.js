import React, { Component } from 'react';
import axios from 'axios';

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
        title={course.title}
      />
    );
    return (
      <div className="bounds">
        <ul>
          {courses}
        </ul>
      </div>
    )
  }
  
}

