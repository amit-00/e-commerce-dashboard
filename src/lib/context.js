import React, { createContext, useReducer } from "react";
import { ProductsReducer, CategoriesReducer, AccountsReducer, OrdersReducer } from './reducers';
import { firestore, storage, createProduct } from './firebase';
import { 
    GET_PRODUCTS,
    GET_PRODUCT,
    SET_PROD_LOADING,
    GET_CATEGORIES,
    SET_CAT_LOADING, 
    GET_ACCOUNT, 
    GET_ACCOUNTS, 
    SET_ACC_LOADING,
    GET_ORDERS,
    GET_ORDER,
    SET_ORD_LOADING } from './types';

export const UserContext = createContext({ user: null });


export const ProductsContext = createContext();
export const OrdersContext = createContext();
export const AccountsContext = createContext();
export const CategoriesContext = createContext();

export const ProductsProvider = ({ children }) => {
    const initialState = {
        products: [],
        product: null,
        loading: true
    }

    const [state, dispatch] = useReducer(ProductsReducer, initialState);

    const getProducts = async () => {
        setLoading();
        try{
            const productsRef = firestore.collection('products');
            productsRef.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach(doc => {
                    const da = doc.data();
                    const id = doc.id;
                    const fullDoc = { id, ...da };
                    items.push(fullDoc);
                });
                console.log('call')
                dispatch({
                    type: GET_PRODUCTS,
                    payload: items
                });
            })
        }
        catch (err) {
            console.error(err);
        }
        
    }

    const getDetails = (id) => {
        setLoading();
        dispatch({ 
            type: GET_PRODUCT,
            payload: id
        });
    }

    const addProduct = async(files, cats, data, prices) => {
        try{
            let form = { ...data };
            let image = [];

            for (let i = 0; i < files.length; i++){
                const storageRef = storage.ref(`/products/${files[i].name}`);
                await storageRef.put(files[i]);

                const url = await storageRef.getDownloadURL();
                image.push(url);
            }
            
            form.image = image;

            if(cats){
                form.categories = cats.split(',').map(cat => cat.trim());
            }

            form.slug = form.name.toLowerCase().trim().split(/\s+/).join('-') + '-' + form.color.toLowerCase().trim().split(/\s+/).join('-');

            let final;

            if(data.wholesale){
                final = {
                    product: {
                        ...form
                    },
                    amounts: {
                        ...prices
                    }
                }
            }
            else{
                final = {
                    product: {
                        ...form
                    },
                    amounts: {
                        first_amount_cad: prices.first_amount_cad,
                        first_amount_usd: prices.first_amount_usd,
                    }
                }
            }

            const doc = await createProduct(final);
            console.log(doc);
            
        }
        catch(err){
            console.log(err);
        }
    }

    const deleteProduct = async (product) => {
        try{
            const imgs = product.image;
            
            imgs.forEach(img => {
                console.log(img)
                let pictureRef = storage.refFromURL(img);
                pictureRef.delete().then(() => { console.log('image deleted') }).catch(err => console.log(err));
            });

            await firestore.collection('products').doc(product.id).delete();

        }
        catch(err){
            console.log(err);
        }
    }

    const setLoading = () => dispatch({ type: SET_PROD_LOADING });

    return (
        <ProductsContext.Provider value={{ products: state.products, product: state.product, loading: state.loading, getProducts, getDetails, addProduct, deleteProduct }} >
            {children}
        </ProductsContext.Provider>
    )

}

export const OrdersProvider = ({ children }) => {
    const initialState = {
        orders: [],
        order: null,
        loading: true
    }

    const [state, dispatch] = useReducer(OrdersReducer, initialState);

    const getOrders = async () => {
        setLoading();
        try{
            const ordersRef = firestore.collection('orders').orderBy('orderDate', 'desc');
            ordersRef.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach(doc => {
                    const da = doc.data();
                    const id = doc.id;
                    const fullDoc = { id, ...da };
                    items.push(fullDoc);
                });
                console.log('call')
                dispatch({
                    type: GET_ORDERS,
                    payload: items
                });
            })
        }
        catch (err) {
            console.error(err);
        }
        
    }

    const getOrderDetails = (id) => {
        setLoading();
        dispatch({
            type: GET_ORDER,
            payload: id
        })
    }

    const changeOrderStatus = async (id, deliv) => {
        try{
            const docRef = firestore.collection('orders').doc(id);
            await docRef.update({ delivered: !deliv })

        }
        catch(err){
            console.log(err);
        }
    }

    const setLoading = () => dispatch({ type: SET_ORD_LOADING });

    return (
        <OrdersContext.Provider value={{ orders: state.orders, order: state.order, loading: state.loading, getOrderDetails, getOrders, setLoading, changeOrderStatus }} >
            {children}
        </OrdersContext.Provider>
    )

}

export const AccountsProvider = ({ children }) => {
    const initialState = {
        accounts: [],
        account: null,
        loading: true
    }

    const [state, dispatch] = useReducer(AccountsReducer, initialState);

    const getAccounts = async () => {
        setLoading();
        try{
            const accountsRef = firestore.collection('users');
            accountsRef.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach(doc => {
                    const da = doc.data();
                    const id = doc.id;
                    const fullDoc = { id, ...da };
                    items.push(fullDoc);
                });
                dispatch({
                    type: GET_ACCOUNTS,
                    payload: items
                });
            })

        }
        catch (err) {
            console.error(err);
        }
        
    }

    const getAccountDetails = (uid) => {
        setLoading();
        dispatch({ 
            type: GET_ACCOUNT,
            payload: uid
        });
    }

    const changeApprovedStatus = async (id, ver) => {
        try{
            const docRef = firestore.collection('users').doc(id);
            await docRef.update({ verified: !ver });
        }
        catch(err){
            console.log(err);
        }
    }

    const setLoading = () => dispatch({ type: SET_ACC_LOADING });

    return (
        <AccountsContext.Provider value={{ accounts: state.accounts, account: state.account, loading: state.loading, getAccounts, getAccountDetails, changeApprovedStatus }} >
            {children}
        </AccountsContext.Provider>
    )

}

export const CategoriesProvider = ({ children }) => {
    const initialState = {
        categories: [],
        loading: true
    }

    const [state, dispatch] = useReducer(CategoriesReducer, initialState);

    const getCategories = async () => {
        try{
            const catsRef = firestore.collection('categories');
            catsRef.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach(doc => {
                    const da = doc.data();
                    const id = doc.id;
                    const fullDoc = { id, ...da };
                    items.push(fullDoc);
                });
                dispatch({
                    type: GET_CATEGORIES,
                    payload: items
                });
            })
        }
        catch (err) {
            console.error(err);
        }
        
    }

    const addCategory = async (name) => {
        try{
            const docRef = firestore.collection('categories').doc();
            await docRef.set({
                name
            });
        }
        catch(err) {
            console.error(err);
        }
    }

    const deleteCategory = async (category) => {
        try{
            await firestore.collection('categories').doc(category.id).delete();
        }
        catch(err){
            console.log(err);
        }
    }

    const setLoading = () => dispatch({ type: SET_CAT_LOADING });

    return (
        <CategoriesContext.Provider value={{ categories: state.categories, loading: state.loading, getCategories, deleteCategory, addCategory, setLoading }} >
            {children}
        </CategoriesContext.Provider>
    )

}

