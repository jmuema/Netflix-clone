import React, { useState, useEffect } from 'react';
import './Banner.css';
import axios from './requests'

function Banner() {
    const [ movie, setMovie] = useState ([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get (requests.fetchNetflixOriginals);

        }
        fetchData();

    }, []);



    return (
        <header>
             <div className="" >
            
            </div>
       

        </header>
      )  
}

export default Banner
