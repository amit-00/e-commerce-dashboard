import React from 'react';
import { Link } from 'react-router-dom';
import ChangeVerify from './ChangeVerify';

const CategoryItem = ({ account }) => {
    const { email, f_name, l_name, company, verified, uid } = account;
    
    return (
        <tbody>
            <tr>
                <th className='border p-2'>{email}</th>
                <th className='border p-2'>{f_name + ' ' + l_name}</th>
                <th className='border p-2'>{company}</th>
                <th className='border p-2'>{verified ? <i aria-hidden className='text-green-500 fas fa-check'></i> : <i aria-hidden className='text-red-500 fas fa-times'></i> }</th>
                <td className='border p-2'>
                    <Link className='border p-2 mr-2' to={`/accounts/${uid}`}>
                        Details 
                    </Link>
                    <ChangeVerify account={account} />
                </td>
            </tr>
        </tbody>
    )
}

export default CategoryItem;