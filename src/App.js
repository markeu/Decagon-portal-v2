import React, { lazy, Suspense, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';

import {
  AuthProvider,
  AuthContext
} from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';

import Home from './pages/Home';
import Signup from './pages/Signup';
import FourOFour from './pages/FourOFour';
import AdminLogin from './pages/admin/Login';
import AdminInvite from './pages/admin/Invite';
import AdminForgotPassword from './pages/admin/ForgotPassword';
import AdminResetPassword from './pages/admin/ResetPassword';
import EmailVerifcation from './pages/EmailVerification';
import Success from './pages/Success';

const Registration = lazy(() => import('./pages/Dashboard'))
const Dashboard = lazy(() => import('./pages/Dashboard'));

const Passsword = lazy(() => import('./pages/Password'));
const Users = lazy(() => import('./pages/Users'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Details = lazy(() => import('./pages/Details'))

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route exact path="/success">
      <Success />
    </Route>
    <Route exact path="/signup">
      <Signup />
    </Route>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/password">
      <Passsword />
    </Route>
    <Route exact path="/forgotpassword">
      <ForgotPassword />
    </Route>
    <Route exact path="/resetpassword">
      <ResetPassword />
    </Route>
    <Route exact path="/email-verification">
      <EmailVerifcation />
    </Route>
    <Route exact path="/admin">
      <AdminLogin />
    </Route>
    <Route exact path="/admin/forgotpassword">
      <AdminForgotPassword />
    </Route>
    <Route exact path="/admin/resetpassword">
      <AdminResetPassword />
    </Route>
    <Route path="*">
      <FourOFour />
    </Route>
  </Switch>
);

const AuthenticatedRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated() ? (
          [children]
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

const AdminRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated() && auth.isAdmin() ? (
          {children}
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={'Loading........'}>
        <Switch>
          <AuthenticatedRoute path="/details">
            <Details/>
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/registration">
            <Registration />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/dashboard">
            <Dashboard />
          </AuthenticatedRoute>

          <AdminRoute path="/admin/invite">
            <AdminInvite />
          </AdminRoute>
          <AuthenticatedRoute path="/users">
            <Users />
          </AuthenticatedRoute>
          <UnauthenticatedRoutes />
        </Switch>
      </Suspense>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <div >
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
