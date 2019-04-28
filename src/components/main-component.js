'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FixComponent from './fix-component';
import DocumentsComponent from './documents-component';
import DescriptionJiraComponent from './description-jira-component';

export default class MainComponent extends React.Component{
  render(){
    return (
      <Router>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div id="mimimiFixNavbar" className="navbar-menu">
            <div className="navbar-start">
                {/* <Link to='/' className='navbar-item'>Documents</Link> */}
                <Link to='/fix'className="navbar-item">Create Fix</Link>
                <Link to='/description' className="navbar-item">Create jira document</Link>
            </div>
          </div>
        </nav>
        <div id='main-study' className='container is-fluid'>
          {/* <Route path='/' exact component={DocumentsComponent}></Route> */}
          <Route path='/fix' exact component={FixComponent}></Route>
          <Route path='/description' exact component={DescriptionJiraComponent}></Route>
        </div>
      </Router>
    )
  }  
}