'use strict'

import React from 'react';
import ReactDOM from 'react-dom';

export default class DashBoardComponent extends React.Component{
  constructor(props){
    super(props);
    this.createSocketEvents = this.createSocketEvents.bind(this);
    this.removeSocketEvents = this.removeSocketEvents.bind(this);
    this.state = {
      deploying: {
        pre: false,
        prepru: false,
        prustage: false
      },
      cantDeploy:{
        pre: true,
        prepru: true,
        prustage: true
      }
    }
    this._init();
  }
  _init(){
    this.createSocketEvents();
  }

  createSocketEvents(){
    socket.on('returnInfoServer',(serverInfo)=>{
      console.log('INFORMACION DEL SERVIDOR');
      console.log(serverInfo);
    });
  }

  removeSocketEvents(){
    socket.off('returnInfoServer');
  }

  componentDidMount(){
    socket.emit('getInfoServers');
    console.log('EMITIENDO');
  }

  componentWillUnmount(){
    this.removeSocketEvents();
  }
  render(){
    return (
      <h1>ESTE ES EL DASHBOARD</h1>
    )
  }
}