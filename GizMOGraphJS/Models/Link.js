import expose from "../Utils/ClassFunctionBinder";
import * as d3 from "d3";

let globalLinkId=0;
export default class Link {
  constructor(model){
    this.model=model;
    this.label="Link_"+globalLinkId;
    this.id="Link_"+globalLinkId;
    globalLinkId++;
    this.renderingGroup=undefined;
    this.linkGroup=undefined;

    
    this.domain=undefined;
    this.range=undefined;
    expose(this,this.renderLink);
    expose(this,this._bindUserInteractions);
    expose(this,this._bindDragInteractions);
    expose(this,this.resumeForce);
    expose(this,this.setDomain);
    expose(this,this.setRange);
    expose(this,this.setDomainRange);
    expose(this,this.calculateLinkPath);
  
  
    this.lineFunction = d3.line()
      .x(function ( d ){
        return d.x;
      })
      .y(function ( d ){
        return d.y;
      })
      .curve(d3.curveMonotoneX);
    
  }
  
  setDomainRange(domain, range){
    this.domain=domain;
    this.range=range;
    
  }
  
  setDomain(domain){
    this.domain=domain;
  }
  setRange(range){
    this.range=range;
  }
  
  update (){
    // full update function of the node; // basically rerender it;
    this.updatePosition();
    
  }
  
  updatePosition(){
    const d1=this.computeIntersectionPoints(this.domain,this.range);
  
    let cp= {x:0.5*d1.dp.x+0.5*d1.rp.x, y: 0.5*d1.dp.y+0.5*d1.rp.y};
    this.x=cp.x;
    this.y=cp.y;
    
    this.renderingGroup.container.attr('transform', 'translate(' + this.x + ',' + this.y + ')');
    this.linkGroup.attr('d', this.lineFunction(this.calculateLinkPath()));
  }
  
  renderLink(){
    this.renderLinkLabelNode();
    this.renderLinkLine();
  }
  
  renderLinkLine(){
    this.linkGroup=this.model.renderLinkLine(this);
    
  }
  
  renderLinkLabelNode(){
    console.log("Rendering a Link "+ this.label);
    this.renderingGroup=this.model.renderLinkLabelNode(this);
    // this.renderingGroup.container.attr('transform', 'translate(' + this.x + ',' + this.y + ')');
    
    this._bindUserInteractions(this.renderingGroup);
    
    
  }
  
  calculateLinkPath(){
    // get domain position
    const d1=this.computeIntersectionPoints(this.domain,this.range);
    
    let cp= {x:0.5*d1.dp.x+0.5*d1.rp.x, y: 0.5*d1.dp.y+0.5*d1.rp.y};
    this.x=cp.x;
    this.y=cp.y;
    let fixPoint1 = { x: d1.dp.x, y: d1.dp.y },
      fixPoint2 = { x: cp.x, y: cp.y },
      fixPoint3 = { x: d1.rp.x, y: d1.rp.y };
  
    return [fixPoint1, fixPoint2, fixPoint3];
    
  }
  
  computeIntersectionPoints(d,r){
    let ip_domain={x:d.x,y:d.y};
    let ip_range={x:r.x,y:r.y};
    return {dp:ip_domain, rp:ip_range};
    
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