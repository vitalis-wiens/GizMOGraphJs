import bindThis from "../Utils/ClassFunctionBinder";
import GizMOWorker from "./GizMOWorker";
export default class Task extends GizMOWorker{
  constructor(){
    super();
    this.worker = undefined;
    this.functionName = undefined;
    this.args = undefined;
    this.constraint = undefined;
    
    bindThis(this,this.tryToExecuteTask);
    
  }
  
  setWorker( w ){
    this.worker = w;
  }
  
  setFunctionName( n ){
    this.functionName = n;
  }
  
  setArguments( args ){
    this.args = args;
  }
  
  setConstraint(c){
    this.constraint=c;
  }
  
  
  tryToExecuteTask(){
  // /**/  console.log("calling tryToExecuteTask");
    let constraintMet=false;
    if (this.constraint) {
      constraintMet = this.constraint();
      if (constraintMet) {
        console.log("We should also execute the task");
        this.executeTask(this.worker, this.functionName, this.args);
      }
      //console.log("\t\t%cDONE",'color:green')
      
    }else{
      constraintMet=true;
    }
    
    if (constraintMet===false){
      // console.log("Not yet ready to be executed");
    }
    
    return constraintMet;
  }
  
}