import React from 'react'

export default function AgentViewInputField({label, value}) {
    return (
        <div className="form-group col-lg-6 col-md-12 col-sm-12">
            <label>{label}</label><br/>
            <input type="text" className="form-control" readOnly defaultValue={value} />
        </div>
    )
}
