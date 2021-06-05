import React, { useContext } from 'react';
import { googleAuthProvider, auth } from '../../lib/firebase';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../lib/context';


const SignIn = () => {
    const { user } = useContext(UserContext);

    

    const signInWithGoogle = async () => {
        try{
            await auth.signInWithPopup(googleAuthProvider);
        }
        catch(err){
            console.log(err);
        }
    }

    if (user){
        if(user.email === process.env.REACT_APP_ADMIN_EMAIL){
            return <Redirect to='/dashboard' />
        }
    }

    return (
        <button className='bg-black w-80 px-4 py-6 my-24 text-white block mx-auto hover:bg-gray-800 ease-in-out duration-150' onClick={ signInWithGoogle }>
            <img className='w-8 inline mr-4' src="/google.png" alt="" />
            Sign In with Google
        </button>
    )
}

export default SignIn;
