import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Post from './Post';

//import './Courses.css';

class Posts extends Component {

    state = {
        records: [],
      };
    
    componentDidMount() {
        this.callApi()
            .then(res => this.setState({
            records: res,
            //long_url: res.long_url,
            //message: res.message
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


    // courseSelectedHandler = (id, title) => {
    //     // this.props.history.push({pathname: '/posts/' + id});
    //     this.props.history.push({
    //         pathname: this.props.match.url + '/' + id,
    //         search: '?title='+title});
    // }
    
    render() {
        return (
            <div>
                <section className="Posts">
                    {
                        this.state.records.map(record => {
                            return (
                                <article
                                    className="Post"
                                    key={record._id}>
                                    <h1>{record.long_url}</h1>
                                    {record.message}
                                </article>
                            );
                        })
                    }
                </section>
            {/* <Route path={this.props.match.url + "/:id"} component={Post} /> */}
            </div>
        );
    }
}

export default Posts;