import { Link } from "react-router-dom";

interface ProfileHeaderProps {
    activePage: 'profile' | 'wishlist' | 'wallet' | 'orders' | 'reviews' | 'address';
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ activePage }) => {    return (
        <div className="head">
            <div className="container">
                <h1>User Account</h1>
                <nav>
                    <Link to="/profile" className={activePage === 'profile' ? 'active' : ''}>
                        <span>Profile</span>
                    </Link>
                    <Link to="/wishlist" className={activePage === 'wishlist' ? 'active' : ''}>
                        <span>Favorite</span>
                    </Link>
                    <Link to="/wallet" className={activePage === 'wallet' ? 'active' : ''}>
                        <span>Wallet</span>
                    </Link>
                    <Link to="/my-orders" className={activePage === 'orders' ? 'active' : ''}>
                        <span>My Orders</span>
                    </Link>
                    <Link to="/my-review" className={activePage === 'reviews' ? 'active' : ''}>
                        <span>My Reviews</span>
                    </Link>
                    <Link to="/my-address" className={activePage === 'address' ? 'active' : ''}>
                        <span>My Address</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default ProfileHeader;
