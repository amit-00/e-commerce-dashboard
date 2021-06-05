import React, { useEffect, useContext } from 'react';
import { AccountsContext } from '../../lib/context';
import Spinner from '../Layout/Spinner';

const ViewAccount = ({ match }) => {
    const accountsContext = useContext(AccountsContext);

    const { account, loading } = accountsContext;

    useEffect(() => {
        accountsContext.getAccountDetails(match.params.id);

        // eslint-disable-next-line
    }, []);

    return loading || !account ? <Spinner /> : (
        <div>
            <h1 className="text-2xl mb-8">{account.f_name + ' ' + account.l_name}</h1>
            <h1 className="text-xl mb-8">Email: { account.email }</h1>
            <h1 className="text-xl mb-8">Company: { account.company }</h1>
            <h1 className="text-xl mb-8">Verified: { account.verified ? 'Yes' : 'No' }</h1>
            <h1 className="text-2xl mb-4">Shipping Details:</h1>
            <p className="mb-4">Address: {account.address}</p>
            <p className="mb-4">City: {account.city}</p>
            <p className="mb-4">Country: {account.country}</p>
            <p className="mb-4">Postal: {account.postal}</p>
        </div>
    )
}

export default ViewAccount;
