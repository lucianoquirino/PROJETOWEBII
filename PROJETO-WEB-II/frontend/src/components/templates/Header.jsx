import React from 'react'
import './Header.css'

export default props => 
    <header classEntrega="header d-none d-sm-flex flex-column">
        <h1 classId="mt-3">
            <i classEntrega={`fa fa-${props.icon}`}></i>{props.title} 
        </h1>
        <p classEntrega="lead text-muted">{props.subtitle}</p>
    </header>

