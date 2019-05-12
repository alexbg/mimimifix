import FusePouchDb from 'fusepouchdb';

export default class SettingModel{
  constructor(){
    this.db = new FusePouchDb('mimimifix');
    this.model = {
      _id: 'settings',
      versions: [],
      dateFormats:[]
    }
    this._init();
  }
  _init(){}
  loadData(){
    return new Promise((resolve,reject)=>{
      this.db.get('settings').then((settings)=>{
        this.model = Object.assign({},this.model,settings);
        console.log(this.model);
        resolve();
      }).catch((error)=>{
        this.db.put(this.model).then((settings)=>{
          this.model = Object.assign({},this.model,settings);
          console.log(this.model);
          resolve();
        }).catch((error)=>{
          reject();
        });
      });
    });
  }
  addVersion(version){
    return this.modelAdd(version,'versions');
  }
  removeVersion(index){
    return this.modelRemove(index,'versions');
  }
  addDateFormat(dateFormat){
    return this.modelAdd(dateFormat,'dateFormats');
  }
  removeDateFormat(index){
    return this.modelRemove(index,'dateFormats');
  }
  modelAdd(data,type){
    if(data && this.model[type] && this.model[type].indexOf(data) == -1){
      this.model[type].push(data);
      return true;
    }
    return false;
  }
  modelRemove(index,type){
    if(index){
      this.model[type].splice(index,1);
      return true;
    }
    return false;
  }
  getVersions(){
    return this.model.versions;
  }
  getDateFormats(){
    return this.model.dateFormats;
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