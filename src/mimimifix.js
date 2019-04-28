'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import MainComponent from './components/main-component';
// import css from './css/bulma.min.css';
import Bulma from 'bulma';

export default class MimimiFix{
  constructor(){}
  renderApp(){
    ReactDOM.render(<MainComponent />,document.getElementById('app'));
  }}