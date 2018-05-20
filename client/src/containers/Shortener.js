import React, { Component } from 'react';

import '../style.css';

class Shortener extends Component {
    state = {
        formValues: {
            message: "",
            url: ""
        },
        short_url:null
    }

    resetHandler = () => {
        this.setState({
            formValues:{
                message: "",
                url: ""               
            }
        })
      }

    changeHandler(event) {
        event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        let value = event.target.value;

        formValues[name] = value;

        this.setState({formValues})
    }

    // componentDidUpdate(){
    //     console.log(this.state);
    // }

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

        this.callApiShorten()
            .then(res => this.setState({
                short_url: res.short_url
            }))
            .catch(err => console.log(err));
        this.resetHandler();
    }

    render() {
        return (
        <div>

        <div className="grid">
                <div className="grid__col--2"/>
                <div className="grid__col--8"> 
                  <form className="form">
                    <label className="form__label--hidden" htmlFor="url">URL:</label> 
                    <input className="form__input" type="text" name="url" id="url" placeholder="URL"
                        value={this.state.formValues["url"]} onChange={this.changeHandler.bind(this)}/>
              
                    <label className="form__label--hidden" htmlFor="message">Message:</label>
                    <textarea className="form__input" id="message" name="message" placeholder="Message..." rows="7" 
                        value={this.state.formValues["message"]} onChange={this.changeHandler.bind(this)}/>
              
                     <input className="btn--default" type="submit" onClick={this.clickHandler}/>
                     <input className="btn--warning" type="reset" onClick={this.resetHandler}/>
                  </form>
                </div>
                <div className="grid__col--2"/>

              </div>

        </div>
        )
      }
}
export default Shortener;