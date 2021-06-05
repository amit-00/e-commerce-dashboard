import React, { useContext, useEffect } from 'react';
import ActiveOrders from '../Orders/ActiveOrders';
import { OrdersContext } from '../../lib/context';
import Spinner from '../Layout/Spinner';

const Dashboard = () => {
    const ordersContext = useContext(OrdersContext);

    const { orders, loading } = ordersContext;

    useEffect(() => {
        if(!orders || orders.length === 0){
            ordersContext.getOrders();
        }
        // eslint-disable-next-line
    }, []);

    return loading || !orders ? <Spinner /> : (
        <>
            <ActiveOrders orders={orders} />
        </>
    )
}

export default Dashboard
