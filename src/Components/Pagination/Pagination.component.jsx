import React from 'react'

export default function Pagination({ showLess, totalCount, showMore, size, page, hasNextRecord }) {
    return (
        <div id="table-nav-buttons" className="row">
            {
                page > 0 ? 
                <button className="btn btn-xs" onClick={showLess}>
                    Previous
                </button>
                : null
            }
            
            <h6> Page { page + 1 } of { Math.ceil(totalCount/size) } </h6>
            {
                hasNextRecord ? 
                <button className="btn btn-xs" onClick={showMore}>
                    Next
                </button>
                : null
            }
        </div>
    )
}
