'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FixComponent from './fix-component';
import DocumentsComponent from './documents-component';
import DescriptionJiraComponent from './description-jira-component';
import SettingsComponent from './settings-component';
import DashBoardComponent from './dashboard-component';

export default class MainComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {mobileMenu: false}
    this.isMobileMenuActived = this.isMobileMenuActived.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
  }
  isMobileMenuActived(event){
    this.setState({mobileMenu: !this.state.mobileMenu});
  }
  closeMobileMenu(){
    if(this.state.mobileMenu){
      this.setState({mobileMenu: false});
    }
  }
  render(){
    return (
      <Router>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a role="button" className={"navbar-burger burger" + (this.state.mobileMenu ? ' is-active' : '')} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={this.isMobileMenuActived}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div id="mimimiFixNavbar" className={"navbar-menu" + (this.state.mobileMenu ? ' is-active' : '')}>
            <div className="navbar-start">
                <Link to='/' className='navbar-item' onClick={this.closeMobileMenu}>DashBoard</Link>
                <Link to='/fix' className="navbar-item" onClick={this.closeMobileMenu}>Create Fix</Link>
                <Link to='/description' className="navbar-item" onClick={this.closeMobileMenu}>Create jira document</Link>
            </div>
            <div className='navbar-end'>
              <Link to='/settings'  className='navbar-item' onClick={this.closeMobileMenu}>Settings</Link>
            </div>
          </div>
        </nav>
        <div id='main-study' className='container is-fluid'>
          <Route path='/' exact component={DashBoardComponent}></Route>
          <Route path='/fix' exact component={FixComponent}></Route>
          <Route path='/description' exact component={DescriptionJiraComponent}></Route>
          <Route path='/settings' exact component={SettingsComponent}></Route>
        </div>
      </Router>
    )
  }  
}