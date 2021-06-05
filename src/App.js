import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserContext, ProductsProvider, CategoriesProvider, AccountsProvider, OrdersProvider } from './lib/context';
import { auth } from './lib/firebase';

import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Pages/Dashboard';
import Products from './components/Pages/Products';
import Categories from './components/Pages/Categories';
import Accounts from './components/Pages/Accounts';
import NewProduct from './components/Pages/NewProduct';
import NewCategory from './components/Categories/NewCategory';
import SignIn from './components/Pages/SignIn';
import ViewProduct from './components/Pages/ViewProduct';
import ViewAccount from './components/Pages/ViewAccount';
import ViewOrder from './components/Pages/ViewOrder';

function App() {
  const [user] = useAuthState(auth);
  

  return (
    <OrdersProvider>
      <AccountsProvider>
      <CategoriesProvider>
        <ProductsProvider>
          <UserContext.Provider value={{user}}>
            <Router>
              <div className="container mx-auto px-2">
                <Sidebar />
                <Switch>
                  <Route exact path='/' component={SignIn} />
                  <PrivateRoute exact path='/dashboard' component={Dashboard} />
                  <PrivateRoute exact path='/products' component={Products} />
                  <PrivateRoute exact path='/categories' component={Categories} />
                  <PrivateRoute exact path='/accounts' component={Accounts} />
                  <PrivateRoute path='/products/create' component={NewProduct} />
                  <PrivateRoute path='/categories/create' component={NewCategory} />
                  <PrivateRoute path='/products/:id' component={ViewProduct} />
                  <PrivateRoute path='/accounts/:id' component={ViewAccount} />
                  <PrivateRoute path='/orders/:id' component={ViewOrder} />
                </Switch>
              </div>
            </Router>
          </UserContext.Provider>
        </ProductsProvider>
      </CategoriesProvider>
      </AccountsProvider>
    </OrdersProvider>
  );
}

export default App;
