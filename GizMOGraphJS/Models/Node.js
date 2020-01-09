import expose from "../Utils/ClassFunctionBinder";

let globalNodeId=0;
export default class Node {
  constructor(model){
    this.model=model;
    this.label="Node_"+globalNodeId;
    this.x=20+ 110*globalNodeId;
    this.y=70;
    this.id="Node_"+globalNodeId;
    this.renderingGroup=undefined;
    globalNodeId++;
    
    expose(this,this.renderNode);
    expose(this,this._bindUserInteractions);
    expose(this,this._bindDragInteractions);
    expose(this,this.resumeForce);
    
    
  }
  
  
  update (){
    // full update function of the node; // basically rerender it;
    this.updatePosition();
    
  }
  
  updatePosition(){
    this.renderingGroup.container.attr('transform', 'translate(' + this.x + ',' + this.y + ')');
  }
  
  
  renderNode(){
    console.log("Rendering a Node "+ this.label);
    this.renderingGroup=this.model.getRenderingEngine().renderingTool().renderNode(this);
    this.renderingGroup.container.attr('transform', 'translate(' + this.x + ',' + this.y + ')');
  
    
    this._bindUserInteractions(this.renderingGroup);
    
  }
  
  
  resumeForce(){
    const eng=this.model.getLayoutEngine();
    eng.resumeForce()
    
    
    
  }
  
  _bindUserInteractions(renderingGroup){
    // bind Drag;
    
    this._bindDragInteractions(renderingGroup.container);
    this._bindHoverInteractions(this);
    
  }
  
  _bindDragInteractions(container){
    // console.log(this.model);
    // console.log(this.model.manager);
    // console.log(this.model.manager.navigationManager);
    // console.log("Below there is the dragTool");
    // console.log(this.model.manager.navigationManager.dragTool);
    // console.log("narf");
    container.call(this.model.manager.navigationManager.getDragTool().callDragBehaviour());
    
  }
  
  _bindHoverInteractions(node){
    this.model.manager.navigationManager.getHoverTool().callHoverBehaviour(node);
  }
  
}