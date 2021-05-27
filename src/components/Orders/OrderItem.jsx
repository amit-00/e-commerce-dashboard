import React from 'react';
import { Link } from 'react-router-dom';

const OrderItem = ({ order }) => {
    const { id, user, date, total, paid, delivered } = order;

    return (
        <tbody>
            <tr>
                <td className='border p-2'>{ id }</td>
                <td className='border p-2'>{ user }</td>
                <td className='border p-2'>{ date }</td>
                <td className='border p-2'>{ total }</td>
                <td className='border p-2'>{ paid }</td>
                <td className='border p-2'>{ delivered ? <i aria-hidden className='text-green-500 fas fa-check'></i> : <i aria-hidden className='text-red-500 fas fa-times'></i>}</td>
                <td className='border p-2'>
                    <Link className='border p-2' to={`/orders/${id}`}>
                        Details 
                    </Link>
                </td>
            </tr>
        </tbody>
    )
}

export default OrderItem;
