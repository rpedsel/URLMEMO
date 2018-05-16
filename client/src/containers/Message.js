import React, { Component } from 'react';

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
        const response = await fetch(this.props.match.params.id);
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
            <div>
                <section className="Message">
                    <article>
                        <h1>{this.state.long_url}</h1>
                        <p>{this.state.message}</p>
                    </article>
                </section>
            {/* <Route path={this.props.match.url + "/:id"} component={Post} /> */}
            </div>
        );
    }
}

export default Message;