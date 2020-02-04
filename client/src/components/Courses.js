import React, { Component } from 'react';
import axios from 'axios';
import CourseDetail from './CourseDetail';

export default class Courses extends Component {

  componentDidMount() {
    axios.get('http://localhost:5000/api/courses')
      .then(res => {
        this.setState({
          courses: res.data.courses
        });
      }).catch(err => {
        console.log('Error fetching data from REST API', err)
      })
  }

  render() {
    let courseList = this.props;
    let courses = courseList.map(course => 
      <CourseDetail 
        title={course.title}
      />
    );
    return (
      <div>
        {courses}
      </div>
    )
  }
  
}

