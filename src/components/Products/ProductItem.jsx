import React from 'react';
import { Link } from 'react-router-dom';
import DeleteProduct from './DeleteProduct';

const ProductItem = ({ product }) => {
    const { id, name, cad, usd } = product;

    return (
        <tbody>
            <tr>
                <td className='border p-2'>{ name }</td>
                <td className='border p-2'>${ (cad/100).toFixed(2) } cad/${(usd/100).toFixed(2)} usd</td>
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
