import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './lib/context';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { user } = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={routeProps => {
                if(!user){
                    return <Redirect to='/' /> 
                }
                if(user.email !== process.env.REACT_APP_ADMIN_EMAIL){
                    return <Redirect to='/' /> 
                }
                return <RouteComponent { ...routeProps } />
            }
            }
        />
    )
}

export default PrivateRoute;
