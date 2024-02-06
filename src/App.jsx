import React from 'react'
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
 import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Weather from './components/Weather';
// import PrivateRoute from './components/PrivateRoute';
import UserTable from './components/UserTable';
import AdminTable from './components/AdminTable';
import UserActivityTracker from './components/UserActivityTracker';
import NotFound from "./components/NotFound"
import useAuth from './hooks/useAuth';
import './App.css'
function App() {
  const { user, isAdmin } = useAuth();
  console.log("content in user ",user)
  return (
    <BrowserRouter>
      <UserActivityTracker />
     <Navbar />
    <Routes>
     
      <Route exact path="/" element={<SignUp />} />
      <Route exact path="/signin" element={<SignIn />}/>
     
      <Route
    exact
    path="/admintable"
    element={isAdmin ? <AdminTable /> : <NotFound />}
  />
  <Route
    exact
    path="/usertable"
    element={user ? <UserTable /> : <NotFound />}
  />
  <Route
    exact
    path="/weather"
    element={user ? <Weather /> : <NotFound />}
  />


        {/* <Route
          exact
          path="/weather"
          element={<PrivateRoute component={Weather} />}
        />
        <Route
          exact
          path="/usertable"
          element={<PrivateRoute component={UserTable} />}
        /> */}
      {/* <Route
          exact
          path="/admintable"
          element={<privateAdmin component={AdminTable} />}
        /> */}

    </Routes>
  </BrowserRouter>
  )
}

export default App
