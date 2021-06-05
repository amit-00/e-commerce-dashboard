import React, { useEffect, useContext } from 'react';
import { OrdersContext } from '../../lib/context';
import Spinner from '../Layout/Spinner';
import SetDelivered from '../Orders/SetDelivered';

const ViewOrder = ({ match }) => {
    const ordersContext = useContext(OrdersContext);

    const { order, loading, getOrderDetails } = ordersContext;

    useEffect(() => {

        getOrderDetails(match.params.id);

        // eslint-disable-next-line
    }, []);

    const makeDate = () => {
        const date = order.orderDate.toDate().toString();
        const arr = date.split(" ");
        const res = arr[0] + ' ' + arr[1] + ' ' + arr[2] + ' ' + arr[3]
        return res;
    }

    return loading || !order ? <Spinner /> : (
        <div>
            <h1 className="text-3xl mb-8">Order Details</h1>
            <p className="text-xl mb-8">Email: { order.customerEmail }</p>
            <p className="text-xl mb-8">Date: { makeDate() }</p>
            <p className="text-xl mb-8">Total: ${ (order.amountTotal/100).toFixed(2) }</p>
            <p className="text-xl mb-8">Status: { order.paymentStatus }</p>
            <p className="text-xl mb-8">Delivered: { order.delivered ? 'yes' : 'no' }</p>
            <hr />
            <p className="text-xl mb-4">Products:</p>
            { order.products.map((prod, index) => (
                <div className='mb-4' key={index}>
                    <p className="text-lg mb-2">Name: {prod.name}</p>
                    <p className='mb-2' >Size: { prod.size }</p>
                    <p className='mb-2'>Quantity: { prod.quantity }</p>
                </div>
            )) }
            <hr />
            <p className="text-xl mb-4">Shipping Info:</p>
            <p className="text-lg mb-2">Name: { order.shippingInfo.name }</p>
            <p className="text-lg mb-4">Address:</p>
            <p className="mb-2">{order.shippingInfo.address.line1}, {order.shippingInfo.address.city}, {order.shippingInfo.address.state}, {order.shippingInfo.address.country}, {order.shippingInfo.address.postal_code}</p>

            <div className="my-8">
                <SetDelivered id={order.id} deliv={order.delivered} />
            </div>
        </div>
    )
}

export default ViewOrder
