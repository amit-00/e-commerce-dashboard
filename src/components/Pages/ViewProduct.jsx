import React, { useEffect, useContext } from 'react';
import { ProductsContext } from '../../lib/context';
import Spinner from '../Layout/Spinner';
import ImageSlider from '../Layout/ImageSlider';

const ViewProduct = ({ match }) => {
    const productsContext = useContext(ProductsContext);

    const { product, loading } = productsContext;

    useEffect(() => {
        productsContext.getDetails(match.params.id);
    });

    return loading || !product ? <Spinner /> : (
        <div className='grid grid-cols-2 items-center'>
            <div className="justify-self-center">
                <ImageSlider imgs={product.image} />
            </div>
            <div>
                <h1 className="text-3xl mb-8">{product.name}</h1>
                <h1 className="text-2xl mb-8">Description:</h1>
                <p className='text-xl font-light mb-8' >{product.description}</p>
                <h1 className="text-2xl">Price: ${ product.price }</h1>
            </div>
        </div>
    )
}

export default ViewProduct;
