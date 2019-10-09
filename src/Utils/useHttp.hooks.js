import { useState, useEffect } from 'react';
import swal from './alert';

export const useHttp = ({ url, reqBody }) => {
    const [fectchedData, setFetchedData] = useState(null);
    const [ error, setError ] = useState(false)
    useEffect(() => {
        fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reqBody)
          })
        .then(res => {
            if(!res.ok){
                throw new Error('Failed to Fetch');
            }
            return res.json();
        })
        .then(data => {
            setFetchedData(data)
        })
        .catch(err => {
            swal("Login Failed", `${err}`, 'error')
            setError(true)
        })
    }, [])
    return [fectchedData, error]
}