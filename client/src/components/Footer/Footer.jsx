import React from 'react';
import { data } from 'react-router-dom';

function Footer(){
    return(
        <footer>
            <p className='text-center'>&copy;{new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer;