import React, { useContext } from 'react';
import { CategoriesContext } from '../../lib/context';

const DeleteCategory = ({ category }) => {
    const categoriesContext = useContext(CategoriesContext);

    const del = () => {
        categoriesContext.deleteCategory(category);
    }

    return (
        <button onClick={del} className='p-2 bg-red-500 text-white'>
            Delete
        </button>
    )
}

export default DeleteCategory
