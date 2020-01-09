import * as d3 from 'd3'
import bindThis from "../../Utils/ClassFunctionBinder";

export default class D3V5ForceLayout {
  
  constructor( model ){
    
    
    this.force = null;
    this.forceNodes = [];
    this.forceLinks = [];
    this.nodeLinkModel = model;
    
    
    bindThis(this, this.initializeLayout);
    bindThis(this, this.initializeLayoutData);
    bindThis(this, this.stopForce);
    bindThis(this, this.resumeForce);
    bindThis(this, this.startForce);
    bindThis(this, this.initializeLayoutData);
    bindThis(this, this.recalculatePositions);
    bindThis(this, this.update);
    this.initializeLayout();
  }
  
  
  update(){
    console.log(this.nodeLinkModel);
    this.initializeLayoutData();
  }
  
  initializeLayout(){
    // layout init removes all old nodes;
    
    this.forceLinks = [];
    this.forceNodes = [];
    
    this.force = d3.forceSimulation();
    this.force.on('tick', this.recalculatePositions);
    this.stopForce();
  }
  
  stopForce(){
    if ( this.force ) {
      this.force.stop();
    }
  }
  
  startForce( alpha ){
    if ( this.force ) {
      if ( !arguments.length ) {
        this.force.alpha(1.0); // default alpha value is 1 ;
      } else {
        
        this.force.alpha(alpha);
      }
      this.force.restart();
    }
  }
  
  resumeForce(){
    if ( this.force ) {
      this.force.alpha(0.45);
      this.force.restart();
     
    }
  }
  
  initializeLayoutData(){
   
    if ( this.force ) {
      this.force.stop();
    }
    this.createForceElements();
    
    this.force.alpha(1.0);
    this.force.restart();
    // this.startForce(1.0);
  }
  
  
  recalculatePositions(){
    // console.log('force Alpha ' + this.force.alpha());
    this.nodeLinkModel.positionUpdate();
    
  }
  
  createForceElements(){
    if ( this.force && this.nodeLinkModel ) {
      console.log('creating the force Elements now!!!');
      this.forceLinks = [];
      this.forceNodes = [];
      let i;
      
      console.log('createForceNodes');
      
      // go through the model
      let nodes = this.nodeLinkModel.nodes;
      
      // create force links;
      this.nodeLinkModel.links.forEach(link => {
        
        let Fl={
          source: link.domain,
          target: link.range
        };
        this.forceLinks.push(Fl);
      });
      
      console.log('createdForceLinks');
      
      
      // set them to the simulation;
      this.force.nodes(nodes);
      const size=this.nodeLinkModel.manager.getGraphSize();
      const width = size.w;
      const height = size.h;
      // the binding stuff needs to be called after that thing is created;
      this.force
        .force("charge", d3.forceManyBody().strength(-1000))
        .force("link", d3.forceLink(this.forceLinks).distance(200))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collide', d3.forceCollide(25))
         .force("x", d3.forceX())
         .force("y", d3.forceY());
      this.force.restart();
    } else {
      console.log('%c can not create force elements', 'color:red');
      console.log('\t\t%Reason: ' + this.force ? "we do not have a force" : "we have a force");
    }
  }
  
}