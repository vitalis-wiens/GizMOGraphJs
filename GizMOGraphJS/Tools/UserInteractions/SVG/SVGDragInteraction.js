// this should be a singleton

//@flow

import expose from "../../../Utils/ClassFunctionBinder";
import * as d3 from 'd3';

let dragInstance = null;
/**
 * @return {null}
 */
let SVGDragInteraction = function (){
  if ( dragInstance === null ) {
    dragInstance = new DragInteraction();
  }
  return dragInstance;
};

export default SVGDragInteraction;


// that instance itselft


export class DragInteraction {
  constructor(){
    // never call that thing!

    
    // since this is svg drag interaction, we can create the d3 bahavior for dragging;
    this.dragBehaviour = d3.drag();
    
    
    // we have 3 functions;
    this.onDragStart = this._defaultOnDragStart;
    this.onDrag = this._defaultOnDrag;
    this.onDragEnd = this._defaultOnDragEnd;
  
    expose(this, this.bindDragFunctions);
    expose(this, this.callDragBehaviour);
  
  
  }
  
  
  callDragBehaviour(){
    
    return this.dragBehaviour;
  }
  
  bindDragFunctions(){
    // if user overwrites the drag functions, this will simply bind those;
    this.onDragStart();
    this.onDrag();
    this.onDragEnd();
    console.log(" We have bound the drag interactions")
  }
  
  
  _defaultOnDragStart(){
    this.dragBehaviour.on('start', function ( d ){
      d3.event.sourceEvent.stopPropagation(); // Prevent panning
      d.fixed = true;
      //d.renderingGroup.style("cursor", "pointer");
    })
  }
  
  _defaultOnDrag(){
    this.dragBehaviour.on('drag', function ( d ){
      d3.event.sourceEvent.stopPropagation(); // Prevent panning
      d.x = d3.event.x;
      d.y = d3.event.y;
      d.fx = d3.event.x;
      d.fy = d3.event.y;
      d.updatePosition();
      d.resumeForce();
    })
  }
  
  _defaultOnDragEnd(){
    this.dragBehaviour.on('end', function ( d ){
    //  d.renderingGroup.style("cursor", "auto");
      d.fixed = false;
      d.fx = undefined;
      d.fy = undefined;
    });
  }
  
  
}