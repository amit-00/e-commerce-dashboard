import React, { createContext, useReducer } from "react";
import { ProductsReducer } from './reducers';
import { firestore, storage } from './firebase';
import { GET_PRODUCTS, SET_LOADING, GET_PRODUCT } from './types';

export const UserContext = createContext({ user: null });


export const ProductsContext = createContext();

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

    const addProduct = async(files, cats, data) => {
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

            console.log(form);
            await firestore.collection('products').doc().set(form);
            
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

    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <ProductsContext.Provider value={{ products: state.products, product: state.product, loading: state.loading, getProducts, getDetails, addProduct, deleteProduct }} >
            {children}
        </ProductsContext.Provider>
    )

}