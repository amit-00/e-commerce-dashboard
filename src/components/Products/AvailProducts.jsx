import React from 'react';
import ProductItem from './ProductItem';


const AvailProducts = ({ products }) => {

    return (
        <>
            <h1 className="text-3xl mb-4 mt-8">Available Products</h1>
            <table className='w-full' >
                <thead>
                    <tr className='uppercase bg-dark text-white text-left' >
                        <th className='border border-white p-2' >id</th>
                        <th className='border border-white p-2'>name</th>
                        <th className='border border-white p-2'>price</th>
                        <th className='border border-white p-2'>details</th>
                    </tr>
                </thead>
                { products.map(product => <ProductItem product={product} key={product.id} />) }
            </table>
        </>
    )
}

export default AvailProducts;
