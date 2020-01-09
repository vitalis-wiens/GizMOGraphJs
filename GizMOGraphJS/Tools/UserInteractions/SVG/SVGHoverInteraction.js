// this should be a singleton

//@flow

import expose from "../../../Utils/ClassFunctionBinder";
import * as d3 from 'd3';

let hoverInstance = null;
/**
 * @return {null}
 */
let SVGHoverInteraction = function (){
  if ( hoverInstance === null ) {
    hoverInstance = new HoverInteraction();
  }
  return hoverInstance;
};

export default SVGHoverInteraction;


// that instance itselft


export class HoverInteraction {
  constructor(){
    // never call that thing!
    // expose(this, this.bindHoverFunctions);
    // since this is svg drag interaction, we can create the d3 bahavior for dragging;
    
  }
  
  
  callHoverBehaviour( node ){
    node.hovered = false;
    node.mouseEntered = false;
    
    node.renderingGroup.container.on("mouseover", this.mouseHoverIn);
    node.renderingGroup.container.on("mouseout", this.mouseHoverOut);
    
    
  }
  
  
  mouseHoverIn(){
    const node = this.__data__;
    if ( node.hovered === true ) {
      return;
    } else node.hovered = true;
    
    // bring the node up
    const selectedNode = node.renderingGroup.container.node();
    let nodeContainer = selectedNode.parentNode;
    nodeContainer.appendChild(selectedNode);
    
    node.renderingGroup.container.style('cursor', "pointer");
    node.renderingGroup.shape.style('fill', "red");
    
  }
  
  mouseHoverOut(){
    const node = this.__data__;
    node.hovered=false;
  
    node.renderingGroup.container.style('cursor', "auto");
    node.renderingGroup.shape.style('fill', "#34879d");
    
  }
  
  
}