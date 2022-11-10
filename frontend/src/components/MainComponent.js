import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Admin from './AdminComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends Component {

    render () {
        return (
            <div>
                <Header />
                    <Switch>
                        <Route exact path='/home' component={Home} />
                        <Route exact path='/admin' component={Admin} />
                        <Redirect to='/home' />
                    </Switch>
                <Footer />
            </div>
        )
    }
}   

export default withRouter(Main);