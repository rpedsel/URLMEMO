import React, {Component} from 'react';

import Navigation from '../components/Navigation';

class Layout extends Component {

    render () {
        return (
            <div>
                <Navigation/>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;