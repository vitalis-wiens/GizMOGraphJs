//@flow

import Employee from "../Emplyees/Employee";

import bindThis from "../Utils/ClassFunctionBinder";

import SVGNavigationWorker from "../Emplyees/SVGNavigationWorker";



export default class NavigationManager extends Employee {
  constructor( manager ){
    super(manager);
    this.CLASS_TYPE = "NavigationManager";
    
    
    // the navigation manager allows to get and connect the user interactions ;
    
    // based on the rendering engine it creates the corresponding tool to work on it;
    bindThis(this, this.constraint_initializeNavigation);
    bindThis(this, this._initializeNavigation);
    bindThis(this, this.ready);
    bindThis(this, this.getDragTool);
    bindThis(this, this.getHoverTool);
    

    this.navigationWorker=undefined;
    
    
    this.v_ready = false;
    
    
    
    
  }
  
  
  getDragTool(){
    return this.navigationWorker.dragTool;
  }
  
  getHoverTool(){
    return this.navigationWorker.hoverTool;
  }
  
  
  ready(){
    return this.v_ready;
  }
  
  
  _initializeNavigation(){
    // based on the rendering engine we need to create a tool;
    if ( !this.constraint_initializeNavigation() ) {
      console.warn("Navigation Manager is awaiting the rendering engine ...");
      // tell manager that conditions are not fullfilled;
      console.log('Queuing Task for manager! >>  _initializeNavigation');
      // let task=new Task();
      // task.setWorker(this);
      // task.setFunctionName(this.getFunctionName(this.setRenderingEngineType));
      // task.setArguments(arguments);
      // task.setConstraint(this.constraint_setRenderingEngineType);
      //
      this.manager.queTask(this, this.getFunctionName(this._initializeNavigation), arguments, this.constraint_initializeNavigation);
      
    } else {
      // based on the type we create a tool for that
      console.log("We have an met constraint");
      const renderEng = this.manager.renderingEngineManager.getCurrentEngine();
      console.log(renderEng);
      if ( renderEng.CLASS_TYPE === "SVGRenderingEngine" ) {
        this.navigationWorker=new SVGNavigationWorker();
        this.navigationWorker.setRenderingEngine(renderEng);
        this.v_ready=true;
        
      }
      
      
    }
    
    
  }
  
  
  constraint_initializeNavigation(){
    let constraintMet = false;
    const renderingEngine = this.manager.renderingEngineManager.getCurrentEngine();
    if ( renderingEngine ) {
      constraintMet = true;
    }
    return constraintMet;
  }
  
  
}