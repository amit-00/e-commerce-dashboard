import React, { useState, useContext } from 'react';
import { CategoriesContext } from '../../lib/context';
import { Redirect } from 'react-router-dom';


const NewCategory = () => {
    const { addCategory } = useContext(CategoriesContext)
    const [cat, setCat] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        addCategory(cat);
        setSubmitted(true);
    }

    return (
        <form className='mx-auto max-w-7xl flex flex-col' onSubmit={e => onSubmit(e)} >
            <p className='text-xl' >Category Name</p>
            <input type="text" className="text-xl p-2 border my-4" value={cat} onChange={e => setCat(e.target.value)} />
            <button className='p-2 uppercase text-white bg-black text-xl border border-black block' type="submit">Add Category</button>
            {submitted && <Redirect to='/categories' />}
        </form>
    )
}

export default NewCategory
