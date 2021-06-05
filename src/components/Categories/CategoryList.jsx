import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = ({ categories }) => {
    return (
        <>
            <h1 className="text-3xl mb-4 mt-8">Available Categories</h1>
            <table className='w-full' >
                <thead>
                    <tr className='uppercase bg-dark text-white text-left' >
                        <th className='border border-white p-2'>name</th>
                        <th className='border border-white p-2'>delete</th>
                    </tr>
                </thead>
                { categories.map(cat => <CategoryItem category={cat} key={cat.id} />) }
            </table>
        </>
    )
}

export default CategoryList
