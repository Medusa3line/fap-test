import React, { Fragment } from 'react';
import Layout from '../Layout/Layout.component';

export default function AuthenticatedPagesLayoutWrapper( { children }) {
    return (
        <Fragment>
            <Layout>
                <div className="page-body">  
                    <div id="bottom-content">
                        { children }
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}
