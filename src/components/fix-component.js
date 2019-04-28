'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

export default class FixComponent extends React.Component{
  constructor(props){
    super(props);
    this.fixForm = {
      branch: '',
      fix: '',
      version: '',
      path: ''
    }
    this.state = {showMessage: false};
    this.create = this.create.bind(this);
    this.saveChanageData = this.saveChanageData.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }
  create(button){
    let fileName = this.createFileName(this.fixForm.branch,this.fixForm.version);
    let directory = this.fixForm.path ? this.fixForm.path+'/' : '';
    let file = fs.createWriteStream(directory+fileName+'.txt');
    let date = this.createDate();
    file.write('<!-- BEGIN '+this.fixForm.branch+' '+date+' -->\n');
    file.write('<script>\n');
    file.write(this.fixForm.fix+'\n');
    file.write('</script>'+'\n');
    file.write('<!-- END '+this.fixForm.branch+' '+date+' -->'+'\n');
    file.end(()=>{
      this.setState({showMessage: true});
      setTimeout(()=>{this.setState({showMessage: false})}, 3000);
    });
  }
  saveChanageData(event){
    this.fixForm[event.target.name] = event.target.value;
  }
  createDate(){
    let date = new Date();
    let stringDate = date.toDateString();
    return stringDate;
  }
  createFileName(branch,version){
    let name;
    if(branch.toLowerCase().indexOf('fix/') != -1){
      let splitedBranch = branch.split('/');
      name = splitedBranch[0]+'_'+splitedBranch[1]+'_v'+version;
    }else{
      name = 'FIX'+'_'+branch+'_v'+version;
    }
    return name;
  }
  openDialog(event){
    window.dialog.showOpenDialog({ properties: ['openDirectory'] },(path)=>{
      if(path.length){
        this.fixForm.path = path[0];
        document.getElementsByName('directory')[0].value = path[0];
      }
    });
  }
  render(){
    return (
      <div id='FixComponent'>
        {this.state.showMessage &&
          <div className="notification is-success">
            The file was created
          </div>
        }
        <div className='field'>
          <label className='label'>Branch</label>
          <div className='control'>
            <input className='input' type='text' name='branch' onChange={this.saveChanageData}></input>
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
            <input type='text' name='version' className='input' onChange={this.saveChanageData}></input>
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
          <div className='control'>
            <button className='button' onClick={this.create}>Create</button>
          </div>
        </div>
      </div>
    );
  }
}