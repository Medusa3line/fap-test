import React from 'react';
import FooterLogo from '../../img/3line_logo.png';
import './Footer.styles.scss';

export default function Footer() {
    return (
        <footer>
            <p>Powered by <img src={FooterLogo} alt="3LINE CARD MANAGEMENT LIMITED" /> </p>
        </footer>
    )
}
