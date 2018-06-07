import React from 'react';

import '../style.css';

const shortResult = (props) => (
    <div className='grid'>
    <div className='centered grid__col--8'>
    <p>Your shortened URL is: <strong>{window.location.href+'message/'+props.short_url}</strong></p>
    </div>
    </div>
);

export default shortResult;