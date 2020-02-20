import React, { Component } from 'react';
import Form from './Form';
import axios from 'axios';

export default class UpdateCourse extends Component {
  state = {
    id: this.props.match.params.id,
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            owner: response.data.course.author,
            title: response.data.course.title,
            description: response.data.course.description,
            estimatedTime: response.data.course.estimatedTime,
            materialsNeeded: response.data.course.materialsNeeded
          })
          if (this.state.owner.id !== authUser.id) {
            this.props.history.push('/forbidden');
          }
        }
      })
      .catch(err => {
        this.props.history.push('/error')
        console.log('Error fetching data from REST API', err)
      })
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
        <h1>Update Course</h1>
        <div>
        <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
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
                    placeholder={title} /></div>
                    </div>
                    <p>By {authUser.firstName} {authUser.lastName}</p>
                  <div><textarea 
                    id="description" 
                    name="description"
                    type="textarea"
                    value={description} 
                    onChange={this.change} 
                    placeholder={description} /></div>
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
                          placeholder={estimatedTime} /></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea 
                          id="materialsNeeded" 
                          name="materialsNeeded"
                          type="text"
                          value={materialsNeeded} 
                          onChange={this.change}
                          className="course"
                          placeholder={materialsNeeded} /></div>
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
    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;
    const { from } = this.props.location.state || { from: { pathname: `/courses/${id}` } };

    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    const course = {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded
    };

    context.data.updateCourse(course, emailAddress, password)
    .then( errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        context.actions.signIn(emailAddress, password)
          .then(() => {
            this.props.history.push(from);
            console.log(`SUCCESS! Course: "${title}" updated`);
          });
      }
    })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      })
  }

  cancel = () => {
    const id = this.props.match.params.id;
    this.props.history.push(`/courses/${id}`);
  }

}