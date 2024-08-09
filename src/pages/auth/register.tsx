import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import logo from './../../images/logo-light.png';
import login from './../../images/login.png';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCredentials, setError } from '../../features/auth/authSlice';

interface FormData {
    name: string;
    email: string;
    mobile: string;
    password: string;
}

interface ApiResponse {
    status: boolean;
    message: string;
    data: {
        name: string;
        email: string;
        token: string;
    };
    detail?: string;
}

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();  // Hook to navigate to different routes
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        mobile: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('https://excite.techno-era.co/en/api/user/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data: ApiResponse = await response.json();

            if (response.ok && data.status) {
                dispatch(setCredentials({
                    name: data.data.name,
                    email: data.data.email,
                    token: data.data.token
                }));
                toast.success("Account created successfully!");
                navigate('/');  // Redirect to the home page after success
            } else {
                dispatch(setError(data.detail || "Registration failed"));
                toast.error(data.detail || "Registration failed");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <DefaultLayout>
            <section className="login_wrapper">
                <div className="img">
                    <img src={login} alt="Login" />
                    <img src={logo} className="logo" alt="Logo" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1>Create an account</h1>
                        <p>Enter your details below</p>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="tel"
                            name="mobile"
                            id="mobile"
                            placeholder="Phone Number"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div className="btns" style={{ gridTemplateColumns: '1fr' }}>
                            <button type="submit" className="btn btn-primary">Create Account</button>
                        </div>
                    </div>
                </form>
            </section>
        </DefaultLayout>
    );
};

export default Register;
