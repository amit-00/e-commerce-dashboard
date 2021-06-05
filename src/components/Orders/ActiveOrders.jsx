import React from 'react';
import OrderItem from './OrderItem';

const ActiveOrders = ({ orders }) => {
    return (
        <>
            <h1 className="text-3xl mb-4">Orders</h1>
            <table className='w-full' >
                <thead>
                    <tr className='uppercase bg-dark text-white text-left' >
                        <th className='border border-white p-2'>email</th>
                        <th className='border border-white p-2'>date</th>
                        <th className='border border-white p-2'>total</th>
                        <th className='border border-white p-2'>paid</th>
                        <th className='border border-white p-2'>delivered</th>
                        <th className='border border-white p-2'>details</th>
                    </tr>
                </thead>
                { orders.map(ord => <OrderItem key={ord.id} order={ord} />) }
            </table>
        </>
    )
}

export default ActiveOrders;
