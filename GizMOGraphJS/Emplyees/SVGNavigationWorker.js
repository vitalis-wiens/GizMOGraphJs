import Employee from "../Emplyees/Employee";
import bindThis from "../Utils/ClassFunctionBinder";
import SVGDragInteraction from "../Tools/UserInteractions/SVG/SVGDragInteraction";
import SVGHoverInteraction from "../Tools/UserInteractions/SVG/SVGHoverInteraction";
import SVGGraphDragZoom from "../Tools/UserInteractions/SVG/SVGGraphDragZoom";
import GizMOWorker from "../BaseClasses/GizMOWorker";

export default class SVGNavigationWorker extends GizMOWorker {
  constructor(  ){
    super();
    this.CLASS_TYPE = "SVG_NAVIGATION_WORKER";
    this.renderingEngine = undefined;
    
    
    bindThis(this, this.setRenderingEngine);
    bindThis(this, this.initialize);
  }
  
  
  setRenderingEngine( re ){
    this.renderingEngine = re;
    this.initialize();
  }
  
  initialize(){
    this.dragTool = SVGDragInteraction();
    this.hoverTool = SVGHoverInteraction();
    this.dragTool.bindDragFunctions();
    this.graphDragZoom = new SVGGraphDragZoom();
    this.graphDragZoom.setRenderingEngine(this.renderingEngine);
  }
}