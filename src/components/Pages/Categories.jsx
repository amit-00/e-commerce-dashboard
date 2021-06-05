import React, { useContext, useEffect } from 'react';
import { CategoriesContext } from '../../lib/context';
import CategoryList from '../Categories/CategoryList';
import AddCategory from '../Categories/AddCategory';
import Spinner from '../Layout/Spinner';

const Categories = () => {
    const categoriesContext = useContext(CategoriesContext);

    const { categories, loading } = categoriesContext;

    useEffect(() => {
        if(!categories || categories.length === 0){
            categoriesContext.getCategories();
        }
        // eslint-disable-next-line
    }, []);


    return loading || !categories ? <Spinner /> : (
        <>
            <AddCategory />
            <CategoryList categories={categories} />
        </>
    )
}

export default Categories;
