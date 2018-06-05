import React, { Component } from 'react';

import '../style.css';
import Aux from '../hoc/Aux';

class Message extends Component {

    state = {
        long_url: null,
        message: null
    };

    componentDidMount() {
        this.callApiId()
            .then(res => this.setState({
                long_url: res.long_url,
                message: res.message
            }))
            .catch(err => console.log(err));

    }
    // componentDidUpdate(){
    //     console.log(this.props.match.params.id);
    // }

    callApiId = async () => {
        const response = await fetch('/api/'+this.props.match.params.id);
        const body = await response.json();
        if (response.status !== 200) throw Error(body);
        return body;
    };


    // courseSelectedHandler = (id, title) => {
    //     // this.props.history.push({pathname: '/posts/' + id});
    //     this.props.history.push({
    //         pathname: this.props.match.url + '/' + id,
    //         search: '?title='+title});
    // }

    render() {
        return (
            <Aux>
                <div className='grid'>
                    <div className="centered grid__col--6">
                        <blockquote>{this.state.message}</blockquote>
                        <p>{this.state.long_url}</p>
                    </div>
                </div>
                <div className='grid'>
                    <div className="grid__col--12" style={{ textAlign: 'center' }}>
                        <button className="btn--default"><a href={this.state.long_url}>GO TO</a></button>
                    </div>
                </div>
            </Aux>

        );
    }
}

export default Message;