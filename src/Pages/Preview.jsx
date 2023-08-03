import React from 'react';
import { Link } from 'react-router-dom';

function Preview() {
    return (
        <div>
            <nav>
                <Link to={'/builder'}>Go to builder</Link>
            </nav>
            <section className='container mx-12'>
                <h1>Question 1</h1>
                <input type="text" className='' />
            </section>
        </div>
    );
}

export default Preview;