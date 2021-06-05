import React from 'react';
import { Link } from 'react-router-dom';

const OrderItem = ({ order }) => {
    const { id, customerEmail, orderDate, amountTotal, paymentStatus, delivered } = order;

    const makeDate = () => {
        const date = orderDate.toDate().toString();
        const arr = date.split(" ");
        const res = arr[0] + ' ' + arr[1] + ' ' + arr[2] + ' ' + arr[3]
        return res;
    }

    return (
        <tbody>
            <tr>
                <td className='border p-2'>{ customerEmail }</td>
                <td className='border p-2'>{ makeDate() }</td>
                <td className='border p-2'>{ (amountTotal/100).toFixed(2) }</td>
                <td className='border p-2'>{ paymentStatus }</td>
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
