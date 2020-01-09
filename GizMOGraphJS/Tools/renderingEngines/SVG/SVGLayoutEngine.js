//@flow
import * as d3 from 'd3';
import bindThis from "../../../Utils/ClassFunctionBinder";
import D3V5ForceLayout from "../../LayoutTools/d3v5ForceDirectedLayout";
export default class SVGLayoutEngine {
  constructor(model){
    this.CLASS_TYPE="SVG_LAYOUT_ENGINE";
    this.engineWorker='d3'; // currently we know about the d3 layout engine, there could be more TODO
    this.engineType="force";
    this.engineWorkerVersion='v5';
    // keep it here for now;
    this.layoutSize = [0, 0];
    this.layoutEngine=null;
    this.nodeLinkModel=null;
  
  
    bindThis(this,this.setNodeLinkModel);
    bindThis(this,this.getImplementationTool);
    
  }
  
  
  getImplementationTool(){
    return this.layoutEngine;
  }
  
  setNodeLinkModel(m){
    this.nodeLinkModel=m;
    // go through the model and create corresponding force nodes and links;
    if (this.engineWorker==='d3' && this.engineType==='force' && this.engineWorkerVersion==='v5'){
      this.layoutEngine=new D3V5ForceLayout(m);
    }
    
    
    
  }
  
  updateInternalModel(){
    // this will update the force nodes and links
    // so basically filtering and user interactions are processed;
    this.layoutEngine.update();
  }
  
  setLayoutEngineType(type){
    console.log(" This should update the layout engine ");
    
  }
  
  
  
  
}