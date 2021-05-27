import React, { useState, useContext } from 'react';
import { MenuItems } from './MenuItems';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../lib/context';
import { auth } from '../../lib/firebase'; 

const SignOut = () => {
    const signOut = async () => {
        await auth.signOut();
    }

    return(
        <button className='bg-black px-4 py-2 text-white text-lg' onClick={signOut}>
            Sign Out
        </button>
    )
}

const Login = () => {
    return (
        <Link className='bg-black px-4 py-2 text-white text-lg' to='/'>
            Sign In
        </Link>
    )
}

const Sidebar = () => {
    const [active, setActive] = useState(false);

    const onClick = () => setActive(!active)

    const location = useLocation();
    const pathname = location.pathname.replace('/', ' ');

    const { user } = useContext(UserContext);


    return (
        <>
            <div className="text-4xl mb-8 flex flex-row justify-between items-center h-20">
                <i onClick={onClick} aria-hidden className="fas fa-bars cursor-pointer mr-8"></i>
                <h1 className="uppercase">{pathname}</h1>
                { user ?  <SignOut /> : <Login />}
            </div>
            <nav onClick={onClick} className={`${active ? 'translate-x-0' : '-translate-x-full'} cursor-pointer absolute h-screen top-0 left-0 transform md:w-96 w-80 bg-dark ease-in-out duration-300 md:px-8 px-4 py-6 z-10`} >
                <i className="fas fa-times text-white text-4xl ml-12"></i>
                <div className="flex flex-col mt-24">
                    {MenuItems.map((item, index) => (
                        <Link className='text-white py-2 px-8 text-2xl my-2 rounded hover:bg-blue-500 ease-in-out duration-150 flex items-center' key={index} to={item.path}>
                            <i aria-hidden className={`${item.icon} mr-4`}></i>
                            {item.title}
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    )
}

export default Sidebar;
