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
                if(user.uid !== process.env.REACT_APP_ADMIN_UID){
                    return <Redirect to='/' /> 
                }
                return <RouteComponent { ...routeProps } />
            }
            }
        />
    )
}

export default PrivateRoute;
