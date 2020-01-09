//@flow
import GizMOWorker from "../BaseClasses/GizMOWorker";
import Employee from "../Emplyees/Employee";
import expose from "../Utils/ClassFunctionBinder";

export default class HTMLManager extends Employee {
  constructor( manager ){
    super(manager);
    this.CLASS_TYPE = "HTMLManager";
    
    this.divId = undefined;
    this.setDivId = this.setDivId.bind(this);
    expose(this, this.updateDivSize);
    
    
    this.w = undefined;
    this.h = undefined;
    
    
  }
  
  
  setDivId( id ){
    this.divId = id;
    this.manager.executeTask(this.manager.renderingEngineManager, 'setRenderingDomId', arguments);
    
    // check if we have this in the dom;
    if ( this.divContainerExists(this.divId) ) {
      console.log("%cthe div container exits", "color:green");
      console.log("You should set the rendering engine >> GizMOGraph.setRenderingEngineType(val);  where val is a string = svg, canvas");
    } else {
      console.error("There is no DIV container where I renderingEngine can be placed");
    }
    
  }
  
  divContainerExists( id ){
    return !!document.getElementById(id);
  }
  
  // createEngineContainer(id){
  //   console.log(">>>> Want to create Engine container "+ id);
  //   this.manager.executeTask(this.manager.renderingEngineManager,"createEngineContainer", arguments);
  //
  //
  // }
  
  updateDivSize( width, height ){
    const div = document.getElementById(this.divId);
    div.style.width = width + "px";
    div.style.height = height + "px";
    this.w = width;
    this.h = height;
  }
  
  graphSize(){
    return { w: this.w, h: this.h }
  }
  
  
}