import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../lib/context';
import { Redirect } from 'react-router-dom';

import './upload.css';

const NewProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cats, setCats] = useState('');
    const [color, setColor] = useState('Red');
    const [cad, setCad] = useState('');
    const [usd, setUsd] = useState('');
    const [wholesale, setWholesale] = useState(false);
    const [cadSecond, setCadSecond] = useState('');
    const [usdSecond, setUsdSecond] = useState('');
    const [cadThird, setCadThird] = useState('');
    const [usdThird, setUsdThird] = useState('');
    const [cadFourth, setCadFourth] = useState('');
    const [usdFourth, setUsdFourth] = useState('');
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const productsContext = useContext(ProductsContext);

	const handleImageChange = (e) => {
		// console.log(e.target.files[])
		if (e.target.files) {
            setFiles(e.target.files);

			const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));


			setSelectedFiles((prevImages) => prevImages.concat(filesArray));
			Array.from(e.target.files).map(
				(file) => URL.revokeObjectURL(file)
			);
		}
	};

	const renderPhotos = (source) => {
		return source.map((photo) => {
			return <img className='uploaded-img' src={photo} alt="" key={photo} />;
		});
	};

    const onSubmit = (e) => {
        e.preventDefault();

        const numCad = Math.round(parseFloat(cad) * 100);
        const numUsd = Math.round(parseFloat(usd) * 100);
        const numCadSecond = Math.round(parseFloat(cadSecond) * 100);
        const numUsdSecond = Math.round(parseFloat(usdSecond) * 100);
        const numCadThird = Math.round(parseFloat(cadThird) * 100);
        const numUsdThird = Math.round(parseFloat(usdThird) * 100);
        const numCadFourth = Math.round(parseFloat(cadFourth) * 100);
        const numUsdFourth = Math.round(parseFloat(usdFourth) * 100);
        
        const data = {
            name,
            description,
            color,
            wholesale
        }
        const prices = {
            first_amount_cad: numCad,
            first_amount_usd: numUsd,
            second_amount_cad: numCadSecond,
            second_amount_usd: numUsdSecond,
            third_amount_cad: numCadThird,
            third_amount_usd: numUsdThird,
            fourth_amount_cad: numCadFourth,
            fourth_amount_usd: numUsdFourth,
        }
        productsContext.addProduct(files, cats, data, prices);
        setSubmitted(true);
    }

    return (
        <>
            <Link to ='/products' className='px-4 py-2 text-white text-xl bg-black'>
                Go Back
            </Link>
            <h1 className="text-3xl my-8">New Product</h1>
            <form onSubmit={e => onSubmit(e)} className='w-full mb-36'>
                <div className='mb-8 w-full'>
                    <p>Name</p>
                    <input className='border p-2 mt-2 w-full' type="text" name='name' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className='mb-8 w-full'>
                    <p>Description</p>
                    <textarea className='border p-2 mt-2 w-full' type="text" name='description' value={description} onChange={e => setDescription(e.target.value)} ></textarea>
                </div>
                <div className='mb-8 w-full'>
                    <p>Categories</p>
                    <input className='border p-2 mt-2 w-full' type="text" name='cats' value={cats} onChange={e => setCats(e.target.value)} />
                    <p className="text-sm text-gray-400">separate categories with commas</p>
                </div>
                <div className='mb-8 w-full'>
                    <p>Color</p>
                    <select className='border p-2 mt-2 w-full' name='color' value={color} onChange={e => setColor(e.target.value)} >
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Orange">Orange</option>
                        <option value="Purple">Purple</option>
                        <option value="Green">Green</option>
                        <option value="White">White</option>
                        <option value="Black">Black</option>
                    </select>
                </div>
                <div className='mb-8 w-full'>
                    <p>CAD Price</p>
                    <input className='border p-2 mt-2 w-full' type="text" name='cad' value={cad} onChange={e => setCad(e.target.value)} />
                </div>
                <div className='mb-8 w-full'>
                    <p>USD Price</p>
                    <input className='border p-2 mt-2 w-full' type="text" name='usd' value={usd} onChange={e => setUsd(e.target.value)} />
                </div>
                <div className='mb-8 w-full flex items-center'>
                    <div className={`border border-black h-6 w-6 mr-4 cursor-pointer ${wholesale ? 'bg-black' : 'bg-white'}`} onClick={() => setWholesale(!wholesale)}></div>
                    <p >Wholesale</p>
                </div>
                {wholesale && (
                <>
                <h1 className="text-lg mb-8">Wholesale Prices</h1>
                <div className='mb-8 w-full'>
                    <p>CAD 0-15</p>
                    <input className='border p-2 mt-2 w-full' type="text" name='cadSecond' value={cadSecond} onChange={e => setCadSecond(e.target.value)} />
                </div>
                <div className='mb-8 w-full'>
                    <p>USD 0-15</p>
                    <input className='border p-2 mt-2 w-full' type="text" name='usdSecond' value={usdSecond} onChange={e => setUsdSecond(e.target.value)} />
                </div>
                <div className='mb-8 w-full'>
                    <p>CAD 15-23</p>
                    <input className='border p-2 mt-2 w-full' type="text" name='cadThird' value={cadThird} onChange={e => setCadThird(e.target.value)} />
                </div>
                <div className='mb-8 w-full'>
                    <p>USD 15-23</p>
                    <input className='border p-2 mt-2 w-full' type="text" name='usdThird' value={usdThird} onChange={e => setUsdThird(e.target.value)} />
                </div>
                <div className='mb-8 w-full'>
                    <p>CAD 23-30</p>
                    <input className='border p-2 mt-2 w-full' type="text" name='cadFourth' value={cadFourth} onChange={e => setCadFourth(e.target.value)} />
                </div>
                <div className='mb-8 w-full'>
                    <p>USD 23-30</p>
                    <input className='border p-2 mt-2 w-full' type="text" name='usdFourth' value={usdFourth} onChange={e => setUsdFourth(e.target.value)} />
                </div>
                </>)}
                <div className="uploader">
                    <div className="heading">Upload Images</div>
                    <div>
                        <input type="file" id="file" multiple onChange={handleImageChange} />
                        <div className="label-holder">
                            <label htmlFor="file" className="label">
                                <i aria-hidden className="fas fa-images"></i>
                            </label>
                        </div>
                        <div className="result">{renderPhotos(selectedFiles)}</div>
                    </div>
                </div>
                <button type="submit" className="bg-dark text-white text-2xl px-4 py-2 float-right">Add Product</button>
            </form>
            {submitted && <Redirect to='/products' />}
        </>
    )
}

export default NewProduct;
