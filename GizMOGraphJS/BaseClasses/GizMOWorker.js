//@flow
import Manager from "../Managers/Manager";

export default class GizMOWorker {
  constructor( manager ){
    this.CLASS_TYPE = "GizMOWorker";
    this.manager = manager;
  }
  
  
  executeTask( worker, func, args ){
    // console.log('executing tasks ');
    // console.log(worker);
    // console.log(func);
    
    if ( worker.hasOwnProperty(func) ) {
      // console.log("calling the worker function " + func);
        if ( args.hasOwnProperty("callee") ) {
        // console.log(...args);
        worker[func](...args);
        
      } else {
        // console.log(args);
        worker[func](args);
        
      }
    } else {
      console.log(args);
      console.log(worker);
      console.error("Worker of type " + worker.CLASS_TYPE + " does not have the function " + func + ">> Function call not executed ");
    }
    
    
  }
  
  provideResults(){
  
  }
  
  

  getFunctionName(func){
    
    const fName=func.name;
    if (fName.indexOf("bound ")===0){
      return fName.slice("bound ".length,fName.length);
    }
    else{
      return fName;
    }
    
    
  }
  
}