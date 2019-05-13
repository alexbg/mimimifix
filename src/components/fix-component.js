'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';
import SettingModel from '../models/settings-model';

export default class FixComponent extends React.Component{
  constructor(props){
    super(props);
    this.settings = new SettingModel();
    this.fixForm = {
      branch: '',
      fix: '',
      version: '',
      path: '',
      dateFormat: '',
      endLine: 'lf'
    }
    this.state = {showMessage: false, versions:[],dateFormats:[],loaded: false};
    this.create = this.create.bind(this);
    this.saveChanageData = this.saveChanageData.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }
  create(button){
    let fileName = this.createFileName(this.fixForm.branch,this.fixForm.version);
    let directory = this.fixForm.path ? this.fixForm.path+'/' : '';
    let file = fs.createWriteStream(directory+fileName+'.txt');
    let date = this.createDate();
    let hour = this.createTime();
    let endLine = this.getEndLine();
    file.write('<!-- BEGIN '+'FIX/'+this.fixForm.branch+' '+date+' - '+hour+' -->'+endLine);
    file.write('<script>'+endLine);
    file.write(this.fixForm.fix+endLine);
    file.write('</script>'+endLine);
    file.write('<!-- END '+'FIX/'+this.fixForm.branch+' '+date+' -->'+endLine);
    file.end(()=>{
      this.setState({showMessage: true});
      setTimeout(()=>{this.setState({showMessage: false})}, 3000);
    });
  }
  saveChanageData(event){
    this.fixForm[event.target.name] = event.target.value;
  }
  createDate(){
    let format = this.fixForm.dateFormat ? this.fixForm.dateFormat : 'DD/MM/YYYY';
    return Moment().format(format);
  }
  getEndLine(){
    return this.fixForm.endLine == 'lf' ? '\r' : '\r\n'; 
  }
  createTime(){
    return Moment().format('HH:mm');
  }
  createFileName(branch,version){
    let finalVersion = version ? version : document.getElementsByName('version')[0].value;
    return 'FIX'+'_'+branch+'_v'+finalVersion;
  }
  openDialog(event){
    window.dialog.showOpenDialog({ properties: ['openDirectory'] },(path)=>{
      if(path.length){
        this.fixForm.path = path[0];
        document.getElementsByName('directory')[0].value = path[0];
      }
    });
  }
  componentDidMount(){
    this.settings.loadData().then(()=>{
      this.setState({
        versions: this.settings.getVersions(),
        dateFormats: this.settings.getDateFormats(),
        loaded: true
      });
      if(this.settings.getVersions().length){
        this.fixForm.verion = this.settings.getVersions()[0];
      }
      if(this.settings.getDateFormats().length){
        this.fixForm.dateFormat = this.settings.getDateFormats()[0];
      }
    });
  }
  render(){
    let optionsVersions = [];
    if(this.state.versions && this.state.versions.length){
      this.state.versions.forEach((item,index)=>{
        optionsVersions.push(<option value={item} key={btoa(item)}>{item}</option>);
      });
    }
    let optionsDateFormats = [<option value='DD/MM/YYYY' key={btoa('DD/MM/YYYY')}>DD/MM/YYYY</option>];
    if(this.state.dateFormats && this.state.dateFormats.length){
      this.state.dateFormats.forEach((item,index)=>{
        optionsDateFormats.push(<option value={item} key={btoa(item)}>{item}</option>);
      });
    }
    if(!this.state.loaded){
      return null;
    }else{
      return (
        <div id='FixComponent'>
          {this.state.showMessage &&
            <div className="notification is-success">
              The file was created
            </div>
          }
          <div className="field">
            <label className='label'>Branch</label>
            <div className="control">
              <div className='field has-addons'>
                <div className='control'>
                  <a className="button is-static">FIX</a>
                </div>
                <div className="control">
                  <input className='input' type='text' name='branch' onChange={this.saveChanageData}></input>
                </div>
              </div>
            </div>
          </div>
          <div className='field'>
            <label className='label'>Fix</label>
            <div className='control'>
              <textarea className='textarea' onBlur={this.saveChanageData} name='fix'></textarea>
            </div>
          </div>
          <div className='field'>
            <label className='label'>Version</label>
            <div className='control'>
              <div className="select">
                <select name='version' onChange={this.saveChanageData} defaultValue={this.state.versions.length ? this.state.versions[0] : ''}>
                  {optionsVersions}
                </select>
              </div>
            </div>
          </div>
          <div className='field'>
            <label className='label'>Date Format</label>
            <div className='control'>
              <div className="select">
                <select name='dateFormat' onChange={this.saveChanageData} defaultValue={this.state.dateFormats.length ? this.state.dateFormats[0] : ''}>
                  {optionsDateFormats}
                </select>
              </div>
            </div>
          </div>
          <div className="field has-addons">
            <div className="control">
              <input className="input" type="text" placeholder="Select Path" name='directory'></input>
            </div>
            <div className="control">
              <a className="button is-info" onClick={this.openDialog}>Directory</a>
            </div>
          </div>
          <div className='field'>
            <label className='label'>End Line</label>
            <div className='control'>
              <div className="select">
                <select name='endLine' defaultValue='\n' onChange={this.saveChanageData} >
                  <option value='lf'>LF</option>
                  <option value='crlf'>CRLF</option>
                </select>
              </div>
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <button className='button' onClick={this.create}>Create</button>
            </div>
          </div>
        </div>
      );
    }
  }
}