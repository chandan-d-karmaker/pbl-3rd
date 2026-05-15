'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const LoginPage = () => {

   const handleLogin =  async (e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());
        const { data, error } = await authClient.signIn.email({
            ...userData,

            callbackURL: "/mainpage",
        });
         console.log('signup data: ', { data, error });

        if (data) {
            redirect('/mainpage');

        }
        if (error) {
            alert(error);
        }
    }


    return (
        <div className='flex justify-center items-center h-screen'>
            <form onSubmit={handleLogin} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

                <legend className="fieldset-legend">Log in</legend>

                <label className="label">Email</label>
                <input name='email' type="email" className="input" placeholder="Email" />

                <label className="label">Password</label>
                <input name='password' type="password" className="input" placeholder="Password" />

                <button className="btn btn-neutral mt-4">Login</button>

                <div className='text-center mt-4'>
                    <p>Not a member?  <Link href={'/signup'} className='font-semibold text-red-500'>Sign up now</Link> </p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;