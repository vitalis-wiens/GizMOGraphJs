import React, {Component} from 'react';
import GizmoGraph from "gizmo-graph";
import bindThis from "gizmo-graph/Utils/ClassFunctionBinder";

class GraphComponent extends Component {
  constructor( props ){
    super(props);
    this.divId = props.id;
    this.gizmoGraph = new GizmoGraph();
    bindThis(this,this.onresize);
    
  }
  
  componentDidMount(){
    this.gizmoGraph.sayHello();
    this.gizmoGraph.showYourself();
    this.gizmoGraph.setDivId(this.divId);
    this.gizmoGraph.setRenderingEngine("svg");
    this.gizmoGraph.renderExampleGraph();
    
    
    window.onresize=this.onresize;
    this.onresize();
    
  }
  
  
  onresize(){
    // graph.renManager.setRenderingDivSize(dynamicWidth - 16, dynamicHeight - 16, "px");
    
    this.gizmoGraph.setGraphSize(window.innerWidth - 16, window.innerHeight - 16);
  }
  
  render(){
    return <div id={this.divId} style={{ width: '200px', height: '200px', background: '#999999' }}/>
  }
}

export default GraphComponent;