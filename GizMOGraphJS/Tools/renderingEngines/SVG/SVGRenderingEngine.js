//@flow

import Tool from "../../Tool";
import * as d3 from 'd3';
import bindThis from "../../../Utils/ClassFunctionBinder";
import SVGLayoutEngine from "./SVGLayoutEngine";
import SVGRenderingTool from "./SVGRenderingTool";

let svgLayers=['arrows', 'edges', 'properties', 'nodes']; // currently global stuff;

export default class SVGRenderingEngine extends Tool {
  constructor(divID){
    super();
    this.renderingDivID=divID;
    this.CLASS_TYPE="SVGRenderingEngine";
    this.domThing=undefined;
    this.engineContainer=undefined;
    this.graphContainer=undefined;
    
    this.layoutEngine=undefined;
    this.svg_renderingTool=new SVGRenderingTool();
    
    
    this.createEngineContainer();
    this.prepareEngine();
    
    
    bindThis(this,this.renderModel);
    bindThis(this,this.bindDataModel);
  }
  
  getNodeLayer(){
    return d3.select("#"+this.renderingDivID+"_"+"nodes");
  }
  
  getLinkLayer(){
    return d3.select("#"+this.renderingDivID+"_"+"edges");
  }
  
  renderingTool(){
    return this.svg_renderingTool;
  }
  
  prepareEngine(){
    // ensure we have all we need;
    this.graphContainer=this.engineContainer.append('g');
    // create the layeers;
    this.createLayers();
    // hat do we need?
    
    
    // this.layoutEngine.setModel()
    this.layoutEngine=new SVGLayoutEngine();
    console.log(this.layoutEngine);
    // here we are an svg rendering engine;
    
  }
  
  
  bindDataModel(m){
    this.dataModel=m;
    this.layoutEngine.setNodeLinkModel(m);
  }
  
  createEngineContainer(){
    this.engineContainer= d3.select("#"+this.renderingDivID).append('svg');
    this.engineContainer.node().id="svg_container";
    this.engineContainer.style("background","green");
    // get rendering dom ;
    this.domThing=document.getElementById(this.renderingDivID);
    this.updateContainerSize()
  }
  
  createLayers(){
    // the these vars because for each function does not get the this context;
    const container=this.graphContainer;
    const divID=this.renderingDivID;
    svgLayers.forEach(function ( layer ){
      if ( layer === 'arrows' ) {
        const markerContainer = container.append('defs');
        markerContainer.node().id = divID + '_' + layer;
      } else {
        const renderingLayer = container.append('g');
        renderingLayer.node().id = divID + '_' + layer;
      }
    });
  }
  
  
  updateContainerSize(){
    const size=this.domThing.getBoundingClientRect();
    this.engineContainer.attr("width",size.width);
    this.engineContainer.attr("height",size.height);
  }
  
  
  renderModel(m){
    console.log("Want to render that Model !!!");
    console.log(m);
    
    // render first the nodes;
    m.nodes.forEach(n=> n.renderNode());
    m.links.forEach(l=> l.renderLink());
    
    
    
  }
  
  
}