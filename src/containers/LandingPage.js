import React from 'react';
import Header from '../components/default/Header';
import SignUpForm from '../components/landingPage/SignUpForm';
import dashDesktopSample from '../assets/images/landing-pic-desktop.png';
import dashMobileSample from '../assets/images/landing-pic-mobile.png';

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className='landingPage'>
                <Header />
                <div className='landingPageContent'>
                    <img className='desktopSample' src={dashDesktopSample} alt='Desktop Dashboard Sample' />
                    <img className='mobileSample' src={dashMobileSample} alt='Mobile Dashboard Sample' />
                    <div className='mainText'>
                        <p className='largeText'>Sign up and manage your Budget</p>
                        <p className='smallText'>Note down your expenditure and income, then check your  balance everyday</p>
                    </div>
                    <SignUpForm />
                </div>
            </div>
        );
    }
}

