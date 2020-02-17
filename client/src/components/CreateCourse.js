import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  state = {
    userId: this.props.context.authenticatedUser.id,
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  }
  
  render() {
    const {
      title,
      description,
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
          {/* <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          </div> */}
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
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
                    id="description" 
                    name="description"
                    type="textarea"
                    value={description} 
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
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const {
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;

    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    const course = {
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded
    };

    context.data.createCourse(course, emailAddress, password)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions.signIn(emailAddress, password)
            .then(() => {
              this.props.history.push(from);
            });
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      })
  }

  cancel = () => {
    this.props.history.push('/');
  }

}