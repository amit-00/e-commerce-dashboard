import React from 'react';
import { Link } from 'react-router-dom';

const AddCategory = () => {
    return (
        <Link className='px-4 py-2 text-2xl text-white uppercase bg-dark' to={`/categories/create`}>
            Add Category
            <i aria-hidden className="fas fa-plus ml-4"></i>
        </Link>
    )
}

export default AddCategory;
