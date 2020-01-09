import Node from "./Node"
import expose from "../Utils/ClassFunctionBinder";
import Link from "./Link";

export default class NodeLinkModel {
  constructor(manager){
    this.manager=manager;
    this.nodes=[];
    this.links=[];
  
    expose(this,this.positionUpdate);
    
  }
  
  getLayoutEngine(){
    return this.manager.renderingEngineManager.getLayoutEngine(); // returns the implementation tool
  }
  
  getRenderingEngine(){
    return this.manager.renderingEngineManager.getCurrentEngine();
  }
  
  createExampleData(){
    console.log("THIS SHOULD CREATE NEW ITEMS" );
    this.nodes.push(new Node(this));
    this.nodes.push(new Node(this));
    this.nodes.push(new Node(this));
    this.nodes.push(new Node(this));
    
    // create a link;
    const link=new Link(this);
    link.setDomain(this.nodes[0]);
    link.setRange(this.nodes[1]);
  
    const link2=new Link(this);
    link2.setDomain(this.nodes[0]);
    link2.setRange(this.nodes[2]);
  
  
    this.links.push(link);
    this.links.push(link2);
  }
  
  renderExampleGraph(){
    console.log("THIS SHOULD CALL THE ENGINE TO DRAW THAT THING!");
    
    //renderingEngineManager -> get current Engine;
    this.manager.renderingEngineManager.getCurrentEngine().renderModel({nodes:this.nodes,links:this.links});
    // then call the layoutEngine to do its bidding;
   // this.layoutEngine.updateInternalModel(); // should then start the layout alg;
    
  }
  
  
  renderLinkLabelNode(link){
    return this.getRenderingEngine().renderingTool().renderLinkLabelNode(link);
  }
  
  renderLinkLine(link){
    return this.getRenderingEngine().renderingTool().renderLinkLine(link);
  }
  
  
  positionUpdate(){
    this.nodes.forEach(node=> {
      node.updatePosition();
    });
    this.links.forEach(link=> {
      link.updatePosition();
    })
  }
  
  
}