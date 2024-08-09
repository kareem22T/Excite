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

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
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
            const response = await fetch('https://excite.techno-era.co/en/api/user/login/', {
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
                toast.success("Logged in successfully!");
                navigate('/');  // Redirect to the home page after success
            } else {
                dispatch(setError(data.detail || "Login failed"));
                toast.error(data.detail || "Login failed");
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
                        <h1>Log in</h1>
                        <p>Enter your details below</p>
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
                        <div className="btns">
                            <button type="submit" className="btn btn-primary">Log in</button>
                            <Link to={'/forget-password'}>Forget Password?</Link>
                        </div>
                    </div>
                </form>
            </section>
        </DefaultLayout>
    );
};

export default Login;
