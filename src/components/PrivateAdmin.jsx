import React from 'react';
import { Route  } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import NotFound from "./NotFound"


const PrivateAdmin = ({ component: Component, ...rest }) => {
  const {user,isAdmin} = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? <Component {...props} /> : <NotFound />
      }
    />
  );
};

export default PrivateAdmin;
