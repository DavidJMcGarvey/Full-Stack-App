import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


// Import components
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import withContext from './Context';
// import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpwithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

export default class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <HeaderWithContext />
          
          <Switch>
            <Route exact path="/courses" component={CoursesWithContext} />
            <Route path="/courses/create" component={CreateCourseWithContext} />
            <Route path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route path="/courses/:id" component={CourseDetailWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpwithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}
