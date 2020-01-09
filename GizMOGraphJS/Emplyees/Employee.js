//@flow

import Manager from "../Managers/Manager";
import GizMOWorker from "../BaseClasses/GizMOWorker";


export default class Employee extends GizMOWorker {
  constructor(manager){
    super(manager);
    this.CLASS_TYPE="Employee";
    manager.addEmployee(this);
  }
  
  
  
  
  
  
  
}