import React from 'react';

const SelectBankAccountToOpen = ({selectBank, bank}) => {
    return (
        <div id="panel-bottom">
            <div className="row">
                <div className="form-group">
                <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom: '2vh'}}> 
                    <select className="form-control" required="required" value={bank} onChange={selectBank}>
                    <option value="">Choose Bank </option>
                    <option value="fidelity">Fidelity Bank</option>
                    <option value="gtb">Guaranty Trust Bank</option>
                    </select>
                </div>
                </div>
            </div>
        </div>
    )
}
export default SelectBankAccountToOpen;