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
    this.state = {
      versions: []
    }
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
  componentDidMount(){
    this.settings.loadData().then(()=>{
      this.setState({
        versions: this.settings.getVersions(),
        dateFormats: this.settings.getDateFormats()
      });
    })
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
      })
    }
    if(this.state.dateFormats && this.state.dateFormats.length){
      this.state.dateFormats.forEach((format,index)=>{
        formatsTags.push((
          <div className='tag' key={format}>
            {format}
            <button id={'tag-'+index} className="delete is-small" onClick={this.removeDateFormat}></button>
          </div>
        ));
      })
    }
    return (
      <div>
        <h1 className='title'>SETTINGS</h1>
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