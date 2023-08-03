import React from 'react';
import { Link } from 'react-router-dom';

function NoPage() {
    return <h1>404 <Link to={'./'}>Back to home</Link></h1>;

}

export default NoPage;