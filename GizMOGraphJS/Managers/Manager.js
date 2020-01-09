//@flow
import GizMOWorker from "../BaseClasses/GizMOWorker";
import RenderingEngineManager from "./RenderingEngineManager";
import HTMLManager from "./HtmlManager";
import Task from "../BaseClasses/Task";

import NavigationManager from "./NavigationManager";
import bindThis from "../Utils/ClassFunctionBinder";
import DataManager from "./DataManager";


export default class Manager extends GizMOWorker {
  constructor(){
    super();
    this.CLASS_TYPE = "Manager";
    this.employees = []; // from type Employee;
    this.awaitingQue = [];
    this.awaitingQueTimeOut = null;
    this.queInterval=0;
    bindThis(this, this.processQuedTasks);
    bindThis(this, this.startAwaitingQue);
    bindThis(this, this.renderExampleGraph);
    bindThis(this, this.constraint_renderExampleGraph);
    bindThis(this, this.getNodeLinkModel);
    
    
    this.renderingEngineManager = new RenderingEngineManager(this);
    this.htmlManager = new HTMLManager(this);
    this.navigationManager = new NavigationManager(this);
    this.navigationManager._initializeNavigation();
    this.dataManager=new DataManager(this);
    
    this.dataManager.createExampleData();
   // this.ex_nodeLinkModel=new NodeLinkModel(this);
   // this.ex_nodeLinkModel.createExampleData();
    
    //awaitConditions
   
    
   
    
    
  }
  
  getGraphSize(){
    return this.htmlManager.graphSize();
  }
  
  getNodeLinkModel(){
    return this.dataManager.getCurrentNodeLinkModel();
  }
  
  
  addEmployee( emp ){
    this.employees.push(emp);
  }
  
  
  // gizmoGraph calls;
  
  updateGraphSize(width,height){
    this.executeTask(this.htmlManager, "updateDivSize", arguments);
    this.executeTask(this.renderingEngineManager, "updateEngineContainerSize", arguments)
  }
  
  setDivId( id ){
    this.executeTask(this.htmlManager, "setDivId", arguments);
  }
  
  
  setRenderingEngineType( type ){
    this.executeTask(this.renderingEngineManager, "setRenderingEngineType", arguments)
  }
  
  
  queTask( empl, funcName, args, constraint ){
    console.log("%cPut that thing into the que", 'color:green');
    const task = new Task();
    task.setWorker(empl);
    task.setFunctionName(funcName);
    task.setArguments(args);
    task.setConstraint(constraint);
    this.awaitingQue.push(task);
    this.startAwaitingQue();
  }
  
  
  startAwaitingQue(){
    if ( !this.awaitingQueTimeOut ) {
      this.awaitingQueTimeOut = setInterval(this.processQuedTasks, 500);
    }
  }
  
  processQuedTasks(){
    console.log( this.queInterval+" Awaiting Que has " + this.awaitingQue.length + " tasks in it");
    let removedTasks=[];
    this.queInterval++;
    if (this.awaitingQue.length===0 || this.queInterval>10){
      clearInterval(this.awaitingQueTimeOut);
    }
    this.awaitingQue.forEach(task => {
      const done = task.tryToExecuteTask();
      if ( done === true ) {
        // task can be removed;
        removedTasks.push(task);
      }
    });
    this.awaitingQue =  this.awaitingQue.filter(x => !removedTasks.includes(x));
    // console.log(">> Run A try execute cycle >>  Awaiting Que has " + this.awaitingQue.length + " tasks in it");
    // console.log(this.awaitingQue);
    // //
    
    
    
   
    
   
    
  }
  
  
  
  // dummy testing functions
  renderExampleGraph(){
    console.log(this.navigationManager.ready());
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>RENDERING A MODEL ? <<<<<<<<<<<<<<<<<<<<<<<<<");
    if (this.constraint_renderExampleGraph())
      this.renderingEngineManager.renderNodeLinkModel();
    else{
      // que that task;
      this.queTask(this,"renderExampleGraph",arguments,this.constraint_renderExampleGraph);
    }
  }
  
  constraint_renderExampleGraph(){
    if (this.renderingEngineManager.currentEngine && this.navigationManager.ready())
      return true;
    else{
      console.log("%c >>>>>>>>>>>>>>>>Can not yet render the example graph", 'color:red');
      console.log('engine present?' +this.renderingEngineManager.currentEngine);
      console.log('navigation ready? ' +this.navigationManager.ready());
    }
  }
  
  
  
}