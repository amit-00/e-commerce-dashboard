import React, { useEffect, useContext } from 'react';
import { ProductsContext } from '../../lib/context';
import Spinner from '../Layout/Spinner';
import ImageSlider from '../Layout/ImageSlider';

const ViewProduct = ({ match }) => {
    const productsContext = useContext(ProductsContext);

    const { product, loading } = productsContext;

    useEffect(() => {
        productsContext.getDetails(match.params.id);

        // eslint-disable-next-line
    }, []);

    return loading || !product ? <Spinner /> : (
        <div className='grid grid-cols-2 items-center'>
            <div className="justify-self-center">
                <ImageSlider imgs={product.image} />
            </div>
            <div>
                <h1 className="text-3xl mb-8">{product.name}</h1>
                <h1 className="text-2xl mb-8">Description:</h1>
                <p className='text-xl font-light mb-8' >{product.description}</p>
                <h1 className="text-2xl mb-4">Categories:</h1>
                <div className="mb-8">
                    { product.categories.map((cat, index) => <p className='my-4' key={index} >{cat}</p>) }
                </div>
                <h1 className="text-2xl mb-4">Prices:</h1>
                <p className="my-4">Base CAD: ${ (product.cad/100).toFixed(2) }</p>
                <p className="my-4">Base USD: ${ (product.usd/100).toFixed(2) }</p>
                <p className="my-4">CAD 0-15: ${ (product.secondCad/100).toFixed(2) }</p>
                <p className="my-4">USD 0-15: ${ (product.secondUsd/100).toFixed(2) }</p>
                <p className="my-4">CAD 15-23: ${ (product.thirdCad/100).toFixed(2) }</p>
                <p className="my-4">USD 15-23: ${ (product.thirdUsd/100).toFixed(2) }</p>
                <p className="my-4">CAD 23-30: ${ (product.fourthCad/100).toFixed(2) }</p>
                <p className="my-4">USD 23-30: ${ (product.fourthUsd/100).toFixed(2) }</p>
            </div>
        </div>
    )
}

export default ViewProduct;
