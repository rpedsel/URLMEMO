import React, { Component } from 'react';

class Shortener extends Component {
    state = {
        formValues: {
            message: "",
            url: ""
        },
        short_url:null
    }

    changeHandler(event) {
        event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        let value = event.target.value;

        formValues[name] = value;

        this.setState({formValues})
    }

    // componentDidMount() {
               
    // }
    componentDidUpdate(){
        console.log(this.state);
    }

    callApiShorten = async () => {
        
        const response = await fetch('api/shorten', {
            method: 'POST',
            headers: {
              'Accept':  'application/json',
              'Content-Type':  'application/json'
            },
            body: JSON.stringify(
                this.state.formValues
            )
        });
        const body = await response.json();

    if (response.status !== 200) throw Error(body);
    console.log(body);
    return body;
    };

    clickHandler = (event) => {
        event.preventDefault();
        //this.setState({ loading: true });
        // const record = {
        //     message: this.state.formessage,
        //     long_url: this.state.
        // };
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false });
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false });
        //     });
        this.callApiShorten()
            .then(res => this.setState({
                short_url: res.short_url
            }))
            .catch(err => console.log(err));
    }

    render() {
        return (
        <form>
            <input type="text" name="message" placeholder="Message" 
                value={this.state.formValues["message"]} onChange={this.changeHandler.bind(this)} />
            <input type="text" name="url" placeholder="URL"
                value={this.state.formValues["url"]} onChange={this.changeHandler.bind(this)} />
            <button onClick={this.clickHandler}>Submit</button>
        </form>
        )
      }
}
export default Shortener;