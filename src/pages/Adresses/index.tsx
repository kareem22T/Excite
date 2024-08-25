import { Link, Navigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import profile from '../../images/profile.png'
import { api } from "../../Api";
import { API_URL } from "../../_env";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../../features/auth/authSlice";
import ProfileHeader from "../../components/profile/header";

interface User {
    id: number;
    name: string;
    email: string;
    username: string;
}

const Addresses = () => {
    return (
        <DefaultLayout>
            <div className="profile_wrapper">
                <ProfileHeader activePage="address" />
            </div>
        </DefaultLayout>
    )
}

export default Addresses;