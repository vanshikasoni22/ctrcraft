"use client"

import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e: any) {
        e.preventDefault();
        // handle submit logic
        const { data, error } = await authClient.signUp.email({
            name: name, // required
            email: email, // required
            password: password, // required
            callbackURL: '/create',
        },
        {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            //redirect to the create or sign in page

            redirect('/create');
        },
        onError: (ctx) => {
            // display the error message
            console.log("err", ctx)
        },
     });

     console.log("data", data)
    }

    const handleGoogleSignUp = async () => {
        const data = await authClient.signIn.social({
        provider: "google",
        });
        console.log("data", data)
    }

  return (
     <div className="flex items-center justify-center h-screen">
            <form className="flex flex-col gap-4 bg-zinc-800 p-4 mx-auto" onSubmit={handleSubmit}>
                <h1>SignUp</h1>
                <input
                    className="border border-gray-600 p-2"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    className="border border-gray-600 p-2"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                />
                <input
                    className="border border-gray-600 p-2"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                />
                <button type="submit" className="bg-black text-white p-2 cursor-pointer">
                    Signup
                </button>
                <h1>OR</h1>
                <button type="button" onClick={handleGoogleSignUp} className='text-white cursor-pointer'>SignUp with Google</button>
            </form>
        </div>
  )
}

export default SignupPage
