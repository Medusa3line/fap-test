import React from 'react'
import './panel.scss'

export default function Panel({ title, snippet }) {
    return (
        <div id="panel">
            <h4> {title} </h4>
            <small id="text-capitalize"> {snippet} </small>
        </div>
    )
}
