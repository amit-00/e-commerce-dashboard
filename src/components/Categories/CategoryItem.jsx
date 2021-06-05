import React from 'react';
import DeleteCategory from './DeleteCategory';

const CategoryItem = ({ category }) => {
    const { name } = category;
    
    return (
        <tbody>
            <tr>
                <td className='border p-2'>{ name }</td>
                <td className='border p-2'>
                    <DeleteCategory category={category} />
                </td>
            </tr>
        </tbody>
    )
}

export default CategoryItem;
