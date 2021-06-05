import React, { useContext } from 'react';
import { OrdersContext } from '../../lib/context';
import { Link } from 'react-router-dom';

const SetDelivered = ({ id, deliv }) => {
    const { changeOrderStatus } = useContext(OrdersContext);
    
    const onClick = () => {
        changeOrderStatus(id, deliv);
    }

    return (
        <Link to='/dashboard' className='p-2 text-white bg-black' onClick={() => onClick()}>
            { deliv ? 'Mark as Undelivered' : 'Mark as delivered' }
        </Link>
    )
}

export default SetDelivered
