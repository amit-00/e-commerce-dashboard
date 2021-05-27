import React from 'react';
import OrderItem from './OrderItem';

const ActiveOrders = () => {
    const orders = [
        {
            id: '12345678',
            user: 'johndoe@gmail.com',
            date: '2020-09-28',
            total: '$218.47',
            paid: '2020-09-28',
            delivered: false
        },
        {
            id: '12341234',
            user: 'johndoe@gmail.com',
            date: '2020-09-28',
            total: '$218.47',
            paid: '2020-09-28',
            delivered: false
        },
        {
            id: '56785678',
            user: 'johndoe@gmail.com',
            date: '2020-09-28',
            total: '$218.47',
            paid: '2020-09-28',
            delivered: false
        }
    ]

    return (
        <>
            <h1 className="text-3xl mb-4">Orders</h1>
            <table className='w-full' >
                <thead>
                    <tr className='uppercase bg-dark text-white text-left' >
                        <th className='border border-white p-2' >id</th>
                        <th className='border border-white p-2'>user</th>
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
