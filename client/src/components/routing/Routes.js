import React, { lazy, memo } from "react";
import { Route, Switch } from "react-router-dom";

const Register = lazy(() => import("../auth/Register"));
const Login = lazy(() => import("../auth/Login"));
const Alert = lazy(() => import("../layout/Alert"));
const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const ProfileForm = lazy(() => import("../profile-forms/ProfileForm"));
const AddExperience = lazy(() => import("../profile-forms/AddExperience"));
const AddEducation = lazy(() => import("../profile-forms/AddEducation"));
const Profiles = lazy(() => import("../profiles/Profiles"));
const Profile = lazy(() => import("../profile/Profile"));
const Posts = lazy(() => import("../posts/Posts"));
const Post = lazy(() => import("../post/Post"));
const NotFound = lazy(() => import("../layout/NotFound"));

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/post/:id" component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default memo(Routes);
