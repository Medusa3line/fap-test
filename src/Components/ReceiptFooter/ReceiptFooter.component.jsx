import React from 'react';
import './ReceiptFooter.styles.scss';
import ReceiptFooterLogo from "../../img/3line_logo.png";

export default function ReceiptFooter() {
    return (
        <div id="receipt-footer">
            <h6>Powered by <img src={ReceiptFooterLogo} alt="3LINE CARD MANAGEMENT LIMITED" /></h6>
        </div>
    )
}
