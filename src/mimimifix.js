'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import FixComponent from './components/fix-component';

export default class MimimiFix{
  constructor(){}
  renderApp(){
    ReactDOM.render(<FixComponent />,document.getElementById('app'));
  }
}