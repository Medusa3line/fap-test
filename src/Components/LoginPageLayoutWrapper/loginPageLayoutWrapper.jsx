import React, { Fragment } from 'react'

export default function LoginPageLayoutWrapper( { children }) {
    return (
        <Fragment>
            <div className="login-page-body">
                <div className="row">
                    <div id="fit-image" className="col-lg-6 col-md-6">                        
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 animated zoomIn delay-0.5s">
                        {children}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
