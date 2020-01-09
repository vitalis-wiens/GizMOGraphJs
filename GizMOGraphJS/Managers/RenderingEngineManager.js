//@flow
import Employee from "../Emplyees/Employee";
import Manager from "./Manager";
import bindThis from "../Utils/ClassFunctionBinder";
import SVGRenderingEngine from "../Tools/renderingEngines/SVG/SVGRenderingEngine";

export default class RenderingEngineManager extends Employee {
  constructor( manager ){
    super(manager);
    this.CLASS_TYPE = "RenderingEngineManager";
    this.engines = []; // from type Tool;
    this.engineType = undefined;
    this.renderingDomId = undefined;
    this.currentEngine = undefined;
    
    
    // bind functions to be auto called;
    bindThis(this, this.createEngineContainer);
    bindThis(this, this.setRenderingEngineType);
    bindThis(this, this.addToolResource);
    bindThis(this, this.constraint_createEngineContainer);
    bindThis(this, this.constraint_setRenderingEngineType);
    bindThis(this, this.setRenderingDomId);
    bindThis(this, this.updateEngineContainerSize);
    bindThis(this, this.renderNodeLinkModel);
    bindThis(this, this.getLayoutEngine);
    
    
  }
  
  getCurrentEngine(){
    return this.currentEngine;
  }
  
  setRenderingDomId( id ){
    this.renderingDomId = id;
  }
  
  
  addToolResource( tr ){
    this.engines.push(tr);
  }
  
  setRenderingEngineType( type ){
    this.engineType = type;
    if ( !this.constraint_setRenderingEngineType() ) {
      console.warn("RenderingEngineManager does not know what where to add the engine! << Required div ID , CALL %cGizMOGraph.setDivId function", 'color":red');
      // tell manager that conditions are not fulfilled;
      console.log('Queuing Task for manager! >>  setRendingEngineType');
      // let task=new Task();
      // task.setWorker(this);
      // task.setFunctionName(this.getFunctionName(this.setRenderingEngineType));
      // task.setArguments(arguments);
      // task.setConstraint(this.constraint_setRenderingEngineType);
      //
      this.manager.queTask(this, this.getFunctionName(this.setRenderingEngineType), arguments, this.constraint_setRenderingEngineType);
      
    } else {
      // based on the type we create a tool for that
      console.log("We have an meht constraint");
      
      if ( type === 'svg' ) {
        console.log(" Selector wants to create an SVG rendering tool");
        this.createEngineContainer(this.renderingDomId);
      }
      
      
    }
    
  }
  
  createEngineContainer( id ){
    
    if ( !this.constraint_createEngineContainer() ) {
      console.warn("RenderingEngineManager does not know what kind of engine you need");
      // tell manager that conditions are not fulfilled;
      console.log('Queuing Task for manager!');
      this.manager.queTask(this, this.getFunctionName(this.createEngineContainer), arguments, this.constraint_createEngineContainer);
      
    } else {
      
      //now we can continue
      console.log(">>>>>>> Build An ENGINE NOW");
      if ( !this.currentEngine ) {
        // if we dont have an engine we build it else
        this.currentEngine=this.buildEngineOfType();
      }
      else{
        this.engines.push(this.currentEngine);
        console.log(" Pushed engine to the list of engines , so we can easily exchange between those");
      }
     
      console.log(this.currentEngine);
      
    }
    
    //based on
    
    
  }
  
  renderNodeLinkModel(){
    // request node link model ;
    if (this.manager.getNodeLinkModel()){
      console.log('we have a model to render');
      let m=this.manager.getNodeLinkModel();
      console.log(m);
      if (this.currentEngine){
        this.currentEngine.bindDataModel(m);
        this.currentEngine.renderModel({nodes:m.nodes,links:m.links});
        this.currentEngine.layoutEngine.getImplementationTool().initializeLayoutData();
      }
    }
  
  }
  
  
  getLayoutEngine(){
   return this.currentEngine.layoutEngine.getImplementationTool();
    
  }
  
  updateEngineContainerSize(width,height){
    this.currentEngine.updateContainerSize(width,height);
  }
  
  buildEngineOfType(){
    switch (this.engineType) {
      case 'svg': return this.createSVGEngine();
      case 'canvas': return this.createCanvasEngine();
      default: console.error(" Rendering selector can not build an engine of type "+this.engineType);
    }
    
    
  }
  
  
  //rendering engine build functions;
  createSVGEngine(){
    return new SVGRenderingEngine(this.renderingDomId);
  }


  createCanvasEngine(){
    // todo: create the thingy;
    return new SVGRenderingEngine(this.renderingDomId);

  }
  
  
  
  /** Some Constraints functions **/
  
  constraint_createEngineContainer(){
    let constraintMet = false;
    if ( this.engineType === 'svg' || this.engineType === 'canvas' ) {
      constraintMet = true;
    }
    return constraintMet;
  }
  
  constraint_setRenderingEngineType(){
    let constraintMet = false;
    if ( this.renderingDomId ) {
      constraintMet = true;
    }
    return constraintMet;
  }
  
  
}