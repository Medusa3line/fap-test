import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <li>
            <Link to="#">
                <ReactHTMLTableToExcel
                    table="table-to-xls"
                    className="table-to-xls"
                    filename="receipt"
                    sheet="page"
                    buttonText="Excel"
                />
            </Link>
        </li>
    )
}