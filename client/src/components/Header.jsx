import React from 'react';
import '../styles/components/Wrap.css';
import logo from '../assets/logo.png';

function Header() {
    return (
        <div aria-hidden='true'>
            <img className='w-44' src={logo} />
        </div>
    );
}

export default Header;
