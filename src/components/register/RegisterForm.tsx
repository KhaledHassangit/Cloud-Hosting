"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DOMAIN } from '@/constants/enums';
import Spinner from '@/utlizes/Spinner';

const RegisterForm = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});

    const validateForm = () => {
        const newErrors: { username?: string; email?: string; password?: string } = {};
        
        if (!username.trim()) newErrors.username = "Username is required.";
        if (!email.trim()) newErrors.email = "Email is required.";
        if (!password.trim()) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                setLoading(true);
                await axios.post(`${DOMAIN.HOST}/api/auth/register`, { email, password, username });
                router.replace('/');
                setLoading(false);
                router.refresh();
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    };

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <div className="mb-4">
                <input 
                    className={`border rounded p-2 text-xl w-full ${errors.username ? "border-red-500" : ""}`} 
                    type="text" 
                    placeholder="Enter Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            <div className="mb-4">
                <input 
                    className={`border rounded p-2 text-xl w-full ${errors.email ? "border-red-500" : ""}`} 
                    type="email" 
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
                <input 
                    className={`border rounded p-2 text-xl w-full ${errors.password ? "border-red-500" : ""}`} 
                    type="password" 
                    placeholder="Enter Your Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button 
                disabled={loading} 
                type="submit" 
                className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold disabled:bg-blue-400"
            >
                {loading ? <Spinner /> : "Register"}
            </button>
        </form>
    );
};

export default RegisterForm;
