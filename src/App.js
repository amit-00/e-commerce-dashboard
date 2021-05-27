import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserContext, ProductsProvider } from './lib/context';
import { auth } from './lib/firebase';

import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Pages/Dashboard';
import Products from './components/Pages/Products';
import NewProduct from './components/Pages/NewProduct';
import SignIn from './components/Pages/SignIn';
import ViewProduct from './components/Pages/ViewProduct';

function App() {
  const [user] = useAuthState(auth);
  

  return (
    <ProductsProvider>
      <UserContext.Provider value={{user}}>
        <Router>
          <div className="container mx-auto px-2">
            <Sidebar />
            <Switch>
              <Route exact path='/' component={SignIn} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/products' component={Products} />
              <PrivateRoute path='/products/create' component={NewProduct} />
              <PrivateRoute path='/products/:id' component={ViewProduct} />
            </Switch>
          </div>
        </Router>
      </UserContext.Provider>
    </ProductsProvider>
  );
}

export default App;
