import React from 'react';
import { Link } from 'react-router-dom';
import DeleteProduct from './DeleteProduct';

const ProductItem = ({ product }) => {
    const { id, name, price } = product;

    return (
        <tbody>
            <tr>
                <td className='border p-2'>{ id }</td>
                <td className='border p-2'>{ name }</td>
                <td className='border p-2'>{ price }</td>
                <td className='border p-2'>
                    <Link className='border p-2 mr-2' to={`/products/${id}`}>
                        Details 
                    </Link>
                    <DeleteProduct product={product} />
                </td>
            </tr>
        </tbody>
    )
}

export default ProductItem
