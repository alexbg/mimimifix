import FusePouchDb from 'fusepouchdb';

export default class SettingModel{
  constructor(){
    this.db = new FusePouchDb('mimimifix');
    this.model = {
      _id: 'settings',
      versions: []
    }
    this._init();
  }
  _init(){}
  loadData(){
    return new Promise((resolve,reject)=>{
      this.db.get('settings').then((settings)=>{
        this.model = Object.assign({},settings);
        resolve();
      }).catch((error)=>{
        this.db.put(this.model).then((settings)=>{
          this.model = Object.assign({},settings);
          resolve();
        }).catch((error)=>{
          reject();
        });
      });
    });
  }
  addVersion(version){
    if(version && typeof version === 'string' && this.model.versions.indexOf(version) == -1){
      this.model.versions.push(version);
      return true;
    }
    return false;
  }
  removeVersion(index){
    if(index){
      this.model.versions.splice(index,1);
      return true;
    }
    return false;
  }
  getVersions(){
    return this.model.versions;
  }
  save(){
    return new Promise((resolve,reject)=>{
      this.db.put(this.model).then((response)=>{
        if(response.ok){
          this.model._rev = response.rev;
          resolve(true);
        } 
      }).catch((error)=>{
        reject(error);
      });
    });
  }
}