import React from 'react';
import './ReceiptFooter.styles.scss';
import ReceiptFooterLogo from "../../img/3line_logo.png";

export default function ReceiptFooter() {
    return (
        <div id="receipt-footer">
            <h6>Powered by <img src={ReceiptFooterLogo} alt="FCMB Logo" /></h6>
        </div>
    )
}
