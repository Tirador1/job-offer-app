// App.js
import React, { useState } from 'react';
import { Route, createBrowserRouter } from 'react-router-dom';
import { RouterProvider, createRoutesFromElements } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import UserDashboard from './pages/UserDashboard';
import CompanyHRDashboard from './pages/CompanyHRDashboard';
import PrivateRoute from './components/PrivateRoute';

import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import Jobs from './pages/Jobs';
import JobPage from './pages/JobPage';
import JobPageHr from './pages/JobPageHr';
import ApplyJob from './pages/ApplyJob';
import AddCompany from './pages/AddCompany';
import AddJob from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import ShowApplicationsForJob from './pages/ShowApplicationsForJob';

let roleUser = '';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Function to handle login and set authentication status
  const handleLogin = (accesstoken, role) => {
    const accessToken = accesstoken;
    roleUser = role;

    if (!accessToken) {
      setIsAuthenticated(false);
      sessionStorage.clear();

      clearSessionStorage();
      window.location.reload();
    } else {
      sessionStorage.setItem('accesstoken', accessToken);
      sessionStorage.setItem('role', role);

      setSessionSorage(role, accessToken);
      setIsAuthenticated(true);
    }
  };

  const setSessionSorage = (role, accesstoken) => {
    localStorage.setItem('accesstoken', accesstoken);
    localStorage.setItem('role', role);
  };

  const clearSessionStorage = () => {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('role');
  };

  const routers = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<MainLayout />}>
        <Route
          path="/"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route
            path="/"
            element={
              roleUser === 'User' ? <UserDashboard /> : <CompanyHRDashboard />
            }
          />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route
            path="/company-hr-dashboard"
            element={<CompanyHRDashboard />}
          />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<JobPage />} />
          <Route path="/jobHr/:id" element={<JobPageHr />} />
          <Route path="/applyPage/:id" element={<ApplyJob />} />
          <Route path="/add-company" element={<AddCompany />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/edit-job/:id" element={<EditJobPage />} />
          <Route
            path="/show-applications/:id"
            element={<ShowApplicationsForJob />}
          />
        </Route>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupForm />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ])
  );

  return <RouterProvider router={routers} />;
};

export default App;
