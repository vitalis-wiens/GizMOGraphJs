//@flow

import Employee from "../Emplyees/Employee";
import bindThis from "../Utils/ClassFunctionBinder";
import NodeLinkModel from "../Models/NodeLinkModel";
export default class DataManager extends Employee {
  constructor(manager){
    super(manager);
    this.CLASS_TYPE="Data Manager";
     this.ex_nodeLinkModel=new NodeLinkModel(manager);
    // this.ex_nodeLinkModel.createExampleData();
    
    
    bindThis(this,this.createExampleData);
    bindThis(this,this.getCurrentNodeLinkModel);
    
  }
  
  createExampleData(){
    this.ex_nodeLinkModel.createExampleData();
  }
  
  
  getCurrentNodeLinkModel(){
    return this.ex_nodeLinkModel;
  }
  
  
}