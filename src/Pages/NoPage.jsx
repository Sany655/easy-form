import React from 'react';
import { Link } from 'react-router-dom';

function NoPage() {
    return <h1 className='text-xl md:text-4xl text-center mt-12 md:mt-44'>404 <Link to={'./'} className="text-blue-200">back to home</Link></h1>;

}

export default NoPage;