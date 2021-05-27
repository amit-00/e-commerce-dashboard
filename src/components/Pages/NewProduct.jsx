import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../lib/context';
import { Redirect } from 'react-router-dom';

import './upload.css';

const NewProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cats, setCats] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [files, setFiles] = useState([]);
    const [ selectedFiles, setSelectedFiles ] = useState([]);
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

        const numPrice = parseFloat(price);

        const data = {
            name,
            description,
            color,
            price: numPrice
        }
        productsContext.addProduct(files, cats, data);
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
                    <input className='border p-2 mt-2 w-full' type="text" name='color' value={color} onChange={e => setColor(e.target.value)} />
                </div>
                <div className='mb-8 w-full'>
                    <p>Price</p>
                    <input className='border p-2 mt-2 w-full' type="text" name='price' value={price} onChange={e => setPrice(e.target.value)} />
                </div>
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
