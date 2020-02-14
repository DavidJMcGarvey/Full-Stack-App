import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  state = {
    title: '',
    courseDescription: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  }
  
  render() {
    const {
      title,
      courseDescription,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          </div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div><input 
                    id="title" 
                    name="title" 
                    type="text"
                    value={title} 
                    onChange={this.change}
                    className="input-title course--title--input"
                    placeholder="Course Title..." /></div>
                    </div>
                    <p>By {authUser.firstName} {authUser.lastName}</p>
                  <div><textarea 
                    id="courseDescription" 
                    name="courseDescription"
                    type="textarea"
                    value={courseDescription} 
                    onChange={this.change} 
                    placeholder="Course Description..." /></div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input 
                          id="estimatedTime" 
                          name="estimatedTime"
                          type="text"
                          value={estimatedTime} 
                          onChange={this.change}
                          className="course--time--input" 
                          placeholder="Estimated Time" /></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea 
                          id="materialsNeeded" 
                          name="materialsNeeded"
                          type="text"
                          value={materialsNeeded} 
                          onChange={this.change} 
                          placeholder="Materials Needed" /></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
          )} />
        </div>
      </div>
    )
  }

  // courseCreate = () => {
  //   const { context } = this.props;
  //   const emailAddress = context.authenticatedUser.emailAddress;
  //   const password = context.authenticatedUser.password;
  //   console.log(password);
  //   context.data.createCourse(emailAddress, password)
  //     .then( () => {
  //       this.props.history.push('/courses');
  //     });
  // }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/courses' } };
    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    const course = this.state;
    context.data.createCourse(course, emailAddress, password)
      .then( user => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-In was unsuccessful' ] };
          });
        } else {
          this.props.history.push(from);
          console.log(`SUCCESS! ${emailAddress} is now signed in!`);
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      })
  }

  cancel = () => {
    this.props.history.push('/courses');
  }

}