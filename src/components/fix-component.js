'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

export default class FixComponent extends React.Component{
  constructor(props){
    super(props);
    this.fixForm = {
      branch: '',
      fix: ''
    }
    this.create = this.create.bind(this);
    this.saveChanageData = this.saveChanageData.bind(this);
  }
  create(button){
    console.log('CREATED');
    console.log(this.fixForm);
    let name = this.fixForm.branch.split('/');
    let fileName = name[0]+'-'+name[1];  
    let file = fs.createWriteStream(fileName+'.txt');
    let date = new Date().toString();
    file.write('<!-- BEGIN '+this.fixForm.branch+' '+date+' -->\r\n');
    file.write('<script>\r\n');
    file.write(this.fixForm.fix+'\r\n');
    file.write('</script>'+'\r\n');
    file.write('<!-- END '+this.fixForm.branch+' '+date+' -->'+'\r\n');
    file.end(()=>{
      console.log('TERMINADO');
    });
  }
  saveChanageData(event){
    this.fixForm[event.target.name] = event.target.value;
  }
  render(){
    return (
      <div id='FixComponent'>
        <div>
          <label>Branch</label>
          <input type='text' name='branch' onChange={this.saveChanageData}></input>
        </div>
        <div>
          <label>Fix</label>
          <textarea onBlur={this.saveChanageData} name='fix'></textarea>
        </div>
        {/* <div>
          <label>Mobile or Desktop</label>
          <select name='type' onChange={this.saveChanageData}>
            <option value='desktop'>Desktop</option>
            <option value='mobile'>Mobile</option>
          </select>
        </div> */}
        <div>
          <button onClick={this.create}>Create</button>
        </div>
      </div>
    );
  }
}