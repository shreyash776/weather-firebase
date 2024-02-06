import React from 'react';
import { Route,Routes  } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import NotFound from "./NotFound"


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <NotFound />
      }
    />
    </Routes>
  );
};

export default PrivateRoute;
