import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {
  constructor() {
    super()
    this.state = {
      course: [],
      owner: []
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        if (response.data.course === null) {
          this.props.history.push('/notfound');
        } else {
          this.setState({
            course: response.data.course,
            owner: response.data.course.author
          })
        }
      })
      .catch(err => {
        this.props.history.push('/error')
        console.log('Error fetching data from REST API', err)
      })
  }

  render() {
    const course = this.state.course;
    const author = this.state.owner;
    const id = this.state.course.id;
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    return (
      <div>
        <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            { authUser && authUser.emailAddress === author.emailAddress ?
              <React.Fragment>
                <span><Link className="button" to={`/courses/${id}/update`}>Update Course</Link><a className="button" to="/" onClick={this.courseDelete} >Delete Course</a></span>
                <Link className="button button-secondary" to="/">Return to List</Link>
              </React.Fragment>
            :
              <React.Fragment>
                <Link className="button button-secondary" to="/">Return to List</Link>
              </React.Fragment>  
            }
          </div>
            
        </div>  
      </div>
      <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
      <h3 className="course--title">{course.title}</h3>
              <p>By {author.firstName} {author.lastName}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown 
                source={course.description}
              />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime} hours</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ReactMarkdown 
                    source={course.materialsNeeded}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  courseDelete = () => {
    const { context } = this.props;
    const id = this.props.match.params.id;
    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    context.data.deleteCourse(id, emailAddress, password)
      .then( response => {
        if (response.status === 204) {
          this.props.history.push(from);
          console.log(`SUCCESS! That course just exploded!`);
        } else if (response.status === 403) {
          this.props.history.push('/forbidden');
          console.log(`WHOA! You are not allow to do that!`);
        }
      });
  }

}