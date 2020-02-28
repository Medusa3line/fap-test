import React from 'react'
import ThreeLineLogo from "../../img/3line_logo.png";
import './loginPageFooter.styles.scss';

export default function LoginPageFooter() {
    return (
        <footer className="login-page-footer">
            <p>Powered by <img src={ThreeLineLogo} alt="FCMB Logo" /> </p>
        </footer>
    )
}
