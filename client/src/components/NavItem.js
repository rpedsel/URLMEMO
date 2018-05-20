import React from 'react';
import { NavLink } from 'react-router-dom';

import '../style.css';

const navItem = (props) => (
    <li className="nav__item">
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName="nav_item--current">{props.children}</NavLink>
    </li>
);

export default navItem;