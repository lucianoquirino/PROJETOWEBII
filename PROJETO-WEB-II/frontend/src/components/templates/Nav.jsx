import './Nav.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default props => 
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i>Início
            </Link>
            {/* <a href="#/users">
                <i className="fa fa-users"></i>Usuários
            </a> */}
            <Link to="/entregas">
                <i className="fa fa-entregas"></i>Entregas
            </Link>
        </nav>
    </aside>
