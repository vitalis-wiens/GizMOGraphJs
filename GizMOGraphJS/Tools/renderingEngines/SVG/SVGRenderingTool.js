import Tool from "../../Tool";
import expose from "../../../Utils/ClassFunctionBinder";
import * as d3 from 'd3';

export default class SVGRenderingTool extends Tool {
  
  constructor(){
    super();
    this.CLASS_TYPE = "SVG_RENDERING_TOOL";
    
    // expose some classes
    
   
    
    expose(this, this.renderNode);
  }
  
  
  renderNode( node ){
    // we know we are an svg rendering tool
    console.log(" Provided Node ");
    console.log(node);
    
    // node.model.getRenderingEngine()..append('g')
    const parentContainer = node.model.getRenderingEngine().getNodeLayer();
    
    
    const nodeContainer = parentContainer.append('g');
    nodeContainer.datum(node); // make sure we have the datum set to the node otherwise it will be difficult
    nodeContainer.attr('id', function ( d ){
      return d.id
    });
    
    // draw the shape;
    const shape = nodeContainer.append('rect');
    const radius = 50;
    shape.attr('x', -radius);
    shape.attr('y', -radius);
    shape.attr('width', 2 * radius);
    shape.attr('height', 2 * radius);
    shape.attr('rx', radius);
    shape.attr('ry', radius);
    
    shape.attr('fill', "#34879d");
    shape.style("stroke", "#000000");
    shape.style('stroke-width', "1px");
    
    
    const label = nodeContainer.append('text').text(node.label);
    this.centerLabel(shape, label);
    
    
    return { container: nodeContainer, shape: shape, text: label };
  }
  
  
  renderLinkLine( link ){
    const parentContainer = link.model.getRenderingEngine().getLinkLayer();
    let linkShape = parentContainer.append('path');
    // renderingShape = parentGroup.append(configObject.link_renderingType);
    linkShape.style('stroke', '#000000');
    linkShape.style('stroke-width', '2px');
    linkShape.style('fill', 'none');
    return linkShape;
  }
  
  renderLinkLabelNode( link ){
    console.log("want to render a link! ");
    const parentContainer = link.model.getRenderingEngine().getNodeLayer();
    const linkContainer = parentContainer.append('g');
    linkContainer.datum(link); // make sure we have the datum set to the node otherwise it will be difficult
    linkContainer.attr('id', function ( d ){
      return d.id
    });
    
    
    const shape = linkContainer.append('rect');
    const width = 50;
    const height = 20;
    shape.attr('x', -0.5 * width);
    shape.attr('y', -0.5 * height);
    shape.attr('width', width);
    shape.attr('height', height);
    
    shape.attr('fill', "#479d41");
    shape.style("stroke", "#000000");
    shape.style('stroke-width', "1px");
    
    const label = linkContainer.append('text').text(link.label);
    this.centerLabel(shape, label);
    
    return { container: linkContainer, shape: shape, text: label };
  }
  
  centerLabel( shape, label ){
    console.log("centring text" + label.text());
    const width = label.node().getBoundingClientRect().width;
    const height = label.node().getBoundingClientRect().height;
    
    
    const dy = 0.24 * height;
    const dx = parseInt(-0.5 * width);
    label.attr('dy', dy + 'px');
    label.attr('dx', dx + 'px');
    
    
  }
}