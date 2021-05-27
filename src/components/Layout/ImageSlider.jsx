import React, { useState, useRef, useEffect } from 'react';
import Spinner from './Spinner';

const ImageSlider = ({ imgs }) => {
    const [featured, setFeatured] = useState(imgs[0]);
    const sliderRef = useRef();

    useEffect(() => {
        setFeatured(imgs[0])
    } ,[imgs])

    const makeFeatured = e => setFeatured(imgs[e.target.id]);

    const scrollRight = () => {
        sliderRef.current.scrollLeft += 180;
    }
    const scrollLeft = () => {
        sliderRef.current.scrollLeft -= 180;
    }


    return !imgs ? <Spinner /> : (
        <>
            <img className='max-w-7xl max-h-96 object-cover cursor-pointer border-2 border-black mb-2' src={featured} alt="" />
            
            <div className='max-w-7xl flex h-24 items-center justify-center' >
                <i aria-hidden className="fas fa-arrow-alt-circle-left text-2xl cursor-pointer" onClick={scrollLeft} ></i>
                <div ref={sliderRef} className='flex flex-nowrap overflow-x-hidden w-80 mx-2' >
                    {imgs.map((im, index) => <img onMouseOver={e => makeFeatured(e)} key={index} id={index} className='max-w-xs max-h-24 cursor-pointer opacity-50 m-1 border-2 border-black hover:opacity-100' src={im} alt="" />)}
                </div>
                <i aria-hidden className="fas fa-arrow-alt-circle-right text-2xl cursor-pointer" onClick={scrollRight} ></i>
            </div>
            
        </>
    )
}

export default ImageSlider;
