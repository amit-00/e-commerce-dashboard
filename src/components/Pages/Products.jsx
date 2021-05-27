import React, { useContext, useEffect } from 'react';
import AddProduct from '../Products/AddProduct';
import AvailProducts from '../Products/AvailProducts';
import { ProductsContext } from '../../lib/context';
import Spinner from '../Layout/Spinner';


const Products = () => {
    const productsContext = useContext(ProductsContext);

    const { products, loading } = productsContext;

    useEffect(() => {
        if(!products || products.length === 0){
            productsContext.getProducts();
        }
        // eslint-disable-next-line
    }, []);


    return loading || !products ? <Spinner /> : (
        <>
            <AddProduct />
            <AvailProducts products={products} />
        </>
    )
}

export default Products;
