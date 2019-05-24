import React from 'react';
import SettingModel from '../models/settings-model';

export default class SettingsComponent extends React.Component{
  constructor(props){
    super(props);
    this.settings = new SettingModel();
    this.createVersion = this.createVersion.bind(this);
    this.removeVersion = this.removeVersion.bind(this);
    this.createDateFormat = this.createDateFormat.bind(this);
    this.removeDateFormat = this.removeDateFormat.bind(this);
    this.login = this.login.bind(this);
    this.handleInputLoginForm = this.handleInputLoginForm.bind(this);

    this.state = {
      versions: [],
      login: {username:'',password:''},
      isLogin: false
    }
    this._init();
  }
  
  _init(){
    this.createSocketEvents();
  }

  createSocketEvents(){
    // Load Events
    socket.on('logued',(token)=>{
      console.log('ESTE ES EL USUARIO');
      console.log(token);
      if(token){
        localStorage.setItem('token',token);
      }
    });
  }

  handleInputLoginForm(event){
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      login: Object.assign({},this.state.login,{[name]:value})
    });
  }
  createVersion(event){
    let nextVersion = document.getElementsByName('version')[0];
    if(nextVersion.value){
      if(this.settings.addVersion(nextVersion.value)){
        this.settings.save().then((response)=>{
          console.log(response);
          this.setState({versions: this.settings.getVersions()});
        }).catch((error)=>{
          console.log(error);
        });
      }
    }
  }
  removeVersion(event){
    if(this.settings.removeVersion(event.target.id.split('-')[1])){
      this.settings.save().then((response)=>{
        console.log(response);
        this.setState({versions: this.settings.getVersions()});
      }).catch((error)=>{
        console.log(error);
      });
    };
  }
  createDateFormat(format){
    let nextDateFormat = document.getElementsByName('date-format')[0];
    if(nextDateFormat.value){
      if(this.settings.addDateFormat(nextDateFormat.value)){
        this.settings.save().then((response)=>{
          console.log(response);
          this.setState({dateFormats: this.settings.getDateFormats()});
        }).catch((error)=>{
          console.log(error);
        });
      }
    }
  }
  removeDateFormat(event){
    if(this.settings.removeDateFormat(event.target.id.split('-')[1])){
      this.settings.save().then((response)=>{
        console.log(response);
        this.setState({dateFormats: this.settings.getDateFormats()});
      }).catch((error)=>{
        console.log(error);
      });
    };
  }
  login(event){
    event.preventDefault();
    socket.emit('login',{
      username: this.state.login.username,
      password: this.state.login.password
    });
    console.log(this.state.login);
  }
  componentDidMount(){
    this.settings.loadData().then(()=>{
      this.setState({
        versions: this.settings.getVersions(),
        dateFormats: this.settings.getDateFormats()
      });
    })
  }
  componentWillUnmount(){
    // Remove Events
    socket.off('logued');
  }
  render(){
    let tags = [];
    let formatsTags = [];
    if(this.state.versions && this.state.versions.length){
      this.state.versions.forEach((version,index)=>{
        tags.push((
          <div className='tag' key={version}>
            {version}
            <button id={'tag-'+index} className="delete is-small" onClick={this.removeVersion}></button>
          </div>
        ));
      });
    }
    if(this.state.dateFormats && this.state.dateFormats.length){
      this.state.dateFormats.forEach((format,index)=>{
        formatsTags.push((
          <div className='tag' key={format}>
            {format}
            <button id={'tag-'+index} className="delete is-small" onClick={this.removeDateFormat}></button>
          </div>
        ));
      });
    }
    return (
      <div>
        <h1 className='title'>SETTINGS</h1>
        <form id='login-form' onSubmit={this.login}>
          <h2 className='title'>Login</h2>
          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input" type="text" placeholder="Text input" name='username' onChange={this.handleInputLoginForm}/>
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input" type="password" placeholder="Text input" name='password' onChange={this.handleInputLoginForm}/>
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </div>
          </div>
          <div className="control">
            <button className="button is-primary">Submit</button>
          </div>
        </form>

        <label className="label">Create Version</label>
        <div className="field has-addons">
          <div className="control">
            <input className="input" type="text" placeholder="Version" name='version'></input>
          </div>
          <div className="control">
            <a className="button is-info" onClick={this.createVersion}>
              Create Version
            </a>
          </div>
        </div>
        {tags}
        <div className="field">
          <label className="label">Create Date Format</label>
          <div className="control">
            <div className='field has-addons'>
              <div className='control'>
                <input className="input" type="text" placeholder="format date" name='date-format'></input>
              </div>
              <div className="control">
                <a className="button is-info" onClick={this.createDateFormat}>
                  Create Date Format
                </a>
              </div>
            </div>
          </div>
        </div>
        {formatsTags}
      </div>
    )
  }
}