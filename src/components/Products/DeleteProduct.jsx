import React, { useContext } from 'react';
import { ProductsContext } from '../../lib/context';

const DeleteProduct = ({ product }) => {
    const productsContext = useContext(ProductsContext);

    const del = () => {
        productsContext.deleteProduct(product);
    }

    return (
        <button onClick={del} className='p-2 bg-red-500 text-white'>
            Delete
        </button>
    )
}

export default DeleteProduct
