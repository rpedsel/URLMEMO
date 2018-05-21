import React, { Component } from 'react';

import '../style.css';

class Post extends Component {
    
    render() {
        return (
            <div>
                <div className='grid'>
                    <div className="centered grid__col--6 frame">
                        <blockquote>{this.props.message}</blockquote>
                        <p>{this.props.long_url}</p>
                    {/* </div> */}
                {/* </div> */}
                {/* <div className='grid'> */}
                    <div style={{ textAlign: 'center' }}>
                        <button className="btn--default"><a href={this.props.long_url}>GO TO</a></button>
                    </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default Post;