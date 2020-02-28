import React from 'react'

export default function AgentViewInputField({label, value}) {
    return (
        <div className="form-group col-md-6">
            <label>{label}</label><br/>
            <input type="text" className="form-control" readOnly defaultValue={value} />
        </div>
    )
}
