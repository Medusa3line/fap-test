import React from 'react'
import ThreeLineLogo from "../../img/3line_logo.png";

export default function ReceiptFooter() {
    return (
        <div className="d-flex justify-content-center">
            <h6>Powered by <img src={ThreeLineLogo} className="ml-3" alt="FCMB Logo" /></h6>
        </div>
    )
}
