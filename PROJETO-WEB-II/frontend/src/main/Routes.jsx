import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import Home from '../components/home/Home'
import EntregaCrud from '../components/entrega/entregaCrud/EntregaCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/entregas' component={EntregaCrud} />
        <Redirect from ='*' to='/' />
    </Switch>