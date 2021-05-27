import React from 'react';
import { Link } from 'react-router-dom';

const AddProduct = ({ id }) => {
    return (
        <Link className='px-4 py-2 text-2xl text-white uppercase bg-dark' to={`/products/create`}>
            Add Product
            <i aria-hidden className="fas fa-plus ml-4"></i>
        </Link>
    )
}

export default AddProduct;
