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

import AppShell from './AppShell';

import Home from './pages/Home';
import Signup from './pages/Signup';
import FourOFour from './pages/FourOFour';
import AdminLogin from './pages/admin/Login';
import AdminInvite from './pages/admin/Invite';
import AdminForgotPassword from './pages/admin/ForgotPassword';
import AdminResetPassword from './pages/admin/ResetPassword';
import Success from './pages/Success';

const Registration = lazy(() => import('./pages/Dashboard'))
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Inventory = lazy(() => import('./pages/ResetPassword'));
const Account = lazy(() => import('./pages/Account'));
const Passsword = lazy(() => import('./pages/Password'));
const Users = lazy(() => import('./pages/Users'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

// const LoadingFallback = () => (
//   <AppShell>
//     <div className="p-4">Loading...</div>
//   </AppShell>
// );

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route path="/registration">
      <Registration />
    </Route>
    <Route path="/success">
      <Success />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/password">
      <Passsword />
    </Route>
    <Route path="/resetpassword">
      <ResetPassword/>
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
          <AppShell>{children}</AppShell>
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
          <AppShell>{children}</AppShell>
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
          <AuthenticatedRoute path="/dashboard">
            <Dashboard />
          </AuthenticatedRoute>
          <AdminRoute path="/inventory">
            <Inventory />
          </AdminRoute>
          <AdminRoute path="/admin/invite">
            <AdminInvite />
          </AdminRoute>
          <AuthenticatedRoute path="/account">
            <Account />
          </AuthenticatedRoute>
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
