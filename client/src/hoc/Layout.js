import React, {Component} from 'react';

import Aux from './Aux';
import Navigation from '../components/Navigation';

class Layout extends Component {

    render () {
        return (
            <Aux>
                <Navigation/>
                <main>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;