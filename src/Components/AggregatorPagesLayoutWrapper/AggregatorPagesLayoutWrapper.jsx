import React, { Fragment } from 'react';
import AggregatorHeader from '../../pages/Aggregator/AggregatorHeader/AggregatorHeader';

export default function AggregatorPagesLayoutWrapper( { children }) {
    return (
        <Fragment>
            <div className="body">  
                <div className="container-fluid p-0" style={{backgroundColor: '#f3f3f3', boxSizing: 'border-box'}}>
                    <AggregatorHeader />
                    <Fragment>
                        { children }               
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
