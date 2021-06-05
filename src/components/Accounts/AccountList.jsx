import React from 'react';
import AccountItem from './AccountItem';

const AccountList = ({ accounts }) => {
    return (
        <>
            <h1 className="text-3xl mb-4 mt-8">Accounts</h1>
            <table className='w-full' >
                <thead>
                    <tr className='uppercase bg-dark text-white text-left' >
                        <th className='border border-white p-2'>email</th>
                        <th className='border border-white p-2'>name</th>
                        <th className='border border-white p-2'>company</th>
                        <th className='border border-white p-2'>verified</th>
                        <th className='border border-white p-2'>details</th>
                    </tr>
                </thead>
                { accounts.map(acc => <AccountItem account={acc} key={acc.uid} />) }
            </table>
        </>
    )
}

export default AccountList;
