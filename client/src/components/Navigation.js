import React from 'react';

import NavItem from './NavItem';
import '../style.css';

const navigation = ( props ) => (
    <div className="grid">
      <header className="grid__col--12 panel--padded--centered" role="banner"> 
        <nav className="navbar" role="navigation">
          <ul className="nav is-collapsed-mobile">
            <NavItem link='/' exact>Shortener</NavItem>
            <NavItem link='/posts' exact>Posts</NavItem>
          </ul>
        </nav>
      </header>
    </div>
);

export default navigation;