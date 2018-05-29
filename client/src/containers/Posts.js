import React, { Component } from 'react';

import Post from './Post';

class Posts extends Component {

    state = {
        records: [],
      };
    
    componentDidMount() {
        this.callApi()
            .then(res => this.setState({
            records: res,
            }))
            .catch(err => console.log(err));
        
    }
    // componentDidUpdate(){
    //     console.log(this.state.records);
    // }

    callApi = async () => {
        const response = await fetch('all');
        const body = await response.json();

    if (response.status !== 200) throw Error(body);

    return body;
    };
    
    render() {
        return (
            <div>
                <section className="Posts">
                    {
                        this.state.records.map(record => {
                            return (
                                <Post 
                                key={record.short_url}
                                message={record.message} 
                                long_url={record.long_url}
                                />
                            );
                        })
                    }
                </section>
            </div>
        );
    }
}

export default Posts;