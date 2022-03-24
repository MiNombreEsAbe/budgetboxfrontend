import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../../redux/users/selectors';
import LogoImage from '../../assets/images/logo.png';
import ProfileHeader from './ProfileHeader';

export default function Header() {
    const selector = useSelector(state => state);
    const user = getUser(selector);
    const userId = user ? user.id : null;
	const [openModalMenu, setOpenModalMenu] = useState(false);

    return (
        <>
            {userId ? (
                <div className='nav loggedInNav'>
                    <button onClick={() => setOpenModalMenu(true)} className="sign-out-btn">
                            {user.name}
                            <span className="pic arrow-down"></span>
                        </button>
                    <ProfileHeader
                        user={user} 
                        openModalMenu={openModalMenu}
                        setOpenModalMenu={setOpenModalMenu}
                        />
                </div>
            ) : (
                <div className='nav'>
                    <Link to='/'><img src={ LogoImage } alt='Budget Box Logo' /></Link>
                    <div>
                        <Link to='/login'>Log In</Link>
                        <Link to='/signup' className='signUpLink'>Sign Up</Link>
                    </div>
                </div>
            )}
        </>
    );
}