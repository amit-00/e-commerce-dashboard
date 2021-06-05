import React, { useContext, useEffect } from 'react';
import { AccountsContext } from '../../lib/context';
import AccountList from '../Accounts/AccountList';
import Spinner from '../Layout/Spinner';

const Accounts = () => {
    const accountsContext = useContext(AccountsContext);

    const { accounts, loading } = accountsContext;

    useEffect(() => {
        if(!accounts || accounts.length === 0){
            accountsContext.getAccounts();
        }
        // eslint-disable-next-line
    }, []);


    return loading || !accounts ? <Spinner /> : (
        <>
            <AccountList accounts={accounts} />
        </>
    )
}

export default Accounts;
