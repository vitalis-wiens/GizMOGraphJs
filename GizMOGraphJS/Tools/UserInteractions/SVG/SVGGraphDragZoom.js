// this should be a singleton

//@flow

import expose from "../../../Utils/ClassFunctionBinder";
import * as d3 from 'd3';


export default class SVGGraphDragZoom {
  // this can have multiple instances;
  constructor(){
    this.renderingEngine = null;
    this.graphTranslation = [0, 0];
    this.zoomFactor = 1.0;
    this.zoom = d3.zoom();
    
    // some config stuff;
    this.durration = 150;
    this.minZoom = 0.02;
    this.maxZoom = 5;
    this.zoomFunction = this._defaultZoom;
    this.zoomStartFunction = this._defaultZoomStart;
    this.zoomEndFunction = this._defaultZoomEnd;
    this.zoomMouseMove = this._defaultzoomMouseMove;
    
    this.svgContainer = null;
    this.graphContainer = null;
    this.mouseMouveActive = false;
    
    this.counter1 = 0;
    
    expose(this, this._defaultZoom);
    expose(this, this._defaultZoomStart);
    expose(this, this._defaultZoomEnd);
    expose(this, this._defaultzoomMouseMove);
    
    
    expose(this, this.setRenderingEngine);
    expose(this, this.initialize);
    expose(this, this.zoomFunction);
    expose(this, this.zoomStartFunction);
    expose(this, this.zoomEndFunction);
    expose(this, this.zoomMouseMove);
    expose(this, this.getZoomFactor);
    // expose default functions;
    
    
  }
  
  getZoomFactor(){
    return this.zoomFactor;
  }
  
  setRenderingEngine( eng ){
    this.renderingEngine = eng;
    // initialize it;
    
    this.svgContainer = this.renderingEngine.engineContainer;
    this.graphContainer = this.renderingEngine.graphContainer;
    this.svgContainer.datum(this);
    this.graphContainer.datum(this);
    this.initialize();
    
  }
  
  initialize(){
    this.zoom.duration(this.durration);
    this.zoom.scaleExtent([this.minZoom, this.maxZoom]);
    this.zoom.on("zoom", this.zoomFunction, this);
    this.zoom.on("start", this.zoomStartFunction, this);
    this.zoom.on("end", this.zoomEndFunction);
    
    this.svgContainer.call(this.zoom);
    
    let transform = d3.zoomIdentity
      .translate(this.graphTranslation[0], this.graphTranslation[1])
      .scale(this.zoomFactor);
    this.graphContainer.call(this.zoom.transform, transform);
    this.svgContainer.call(this.zoom.transform, transform);
    
    this.svgContainer.on("mousedown", function ( d ){
      d3.event.stopPropagation();
      console.log(d3.event);
      if ( d3.event.buttons === 4 ) {
        d.svgContainer.style("cursor", "ns-resize");
        d.mouseMouveActive = true;
        d.svgContainer.on("mousemove", d.zoomMouseMove);
      }
    });
    
    this.svgContainer.on("mouseup", function ( d ){
      d.svgContainer.style("cursor", "auto");
      d.mouseMouveActive = false;
      d.svgContainer.on("mousemove", undefined);
      d.oldMouseVal = undefined;
    })
    
    
  }
  
  _defaultZoomStart(){
    const that = this.__data__;
    if ( d3.event.sourceEvent && d3.event.sourceEvent.buttons && d3.event.sourceEvent.buttons === 1 ) {
      that.svgContainer.style('cursor', 'move');
    }
  }
  
  _defaultZoomEnd(){
    const that = this.__data__;
    that.svgContainer.style('cursor', 'auto');
    // save the graph values;
    let t = d3.zoomTransform(that.graphContainer.node());
    that.graphTranslation[0] = t.x;
    that.graphTranslation[1] = t.y;
    that.zoomFactor = t.k;
  }
  
  
  _defaultzoomMouseMove( d ){
    if ( d.mouseMouveActive === false ) return;
    if ( !d.oldMouseVal ) {
      d.oldMouseVal = d3.event.clientY;
      return;
    }
    let t = d3.zoomTransform(d.svgContainer.node());
    d.graphTranslation[0] = t.x;
    d.graphTranslation[1] = t.y;
    d.zoomFactor = t.k;
    // need sign for zoom in or zoom out;
    const diff = d.oldMouseVal - d3.event.clientY;
    d.oldMouseVal = d3.event.clientY;
    const offset = 0.01;
    if ( diff > 0 ) {
      d.zoomFactor += diff * offset;
    }
    if ( diff < 0 ) {
      d.zoomFactor += diff * offset;
    }
    
    let transform = d3.zoomIdentity
      .translate(d.graphTranslation[0], d.graphTranslation[1])
      .scale(d.zoomFactor);
    
    d.graphContainer.call(d.zoom.transform, transform);
    d.svgContainer.call(d.zoom.transform, transform);
  }
  
  _defaultZoom(){
    const that = this.__data__;
    let zoomEventByMWheel = false;
    if ( d3.event.sourceEvent ) {
      if ( d3.event.sourceEvent.deltaY ) {
        zoomEventByMWheel = true;
      }
    }
    if ( zoomEventByMWheel === false ) {
      if ( that.transformAnimation === true ) {
        return;
      }
      that.zoomFactor = d3.event.transform.k;
      that.graphTranslation = [d3.event.transform.x, d3.event.transform.y];
      that.graphContainer.attr('transform', 'translate(' + that.graphTranslation + ')scale(' + that.zoomFactor + ')');
      return;
    }
    
    // wait until the wheel is done
    if ( zoomEventByMWheel ) {
      that.counter1 += 1;
      that.wheelTrigger(d3.event);
      
    }
  }
  
  wheelTrigger( d3Event ){
    let that = this;
    let counter2 = this.counter1;
    that.timeout = setTimeout(function (){
      if ( counter2 === that.counter1 ) {
        that.wheelEnd(d3Event);
      }
    }, 50);
  }
  
  
  wheelEnd( d3Event ){
    clearTimeout(this.timeout);
    this.counter1 = 0;
    const that = this;
    console.log(d3Event.transform.k);
    that.zoomFactor = d3Event.transform.k;
    that.graphTranslation = [d3Event.transform.x, d3Event.transform.y];
    
    that.graphContainer
      .transition()
      .tween('attr.translate', function (){
        return function (){
          that.transformAnimation = true;
          let tr = d3.zoomTransform(that.graphContainer.node());
          that.graphTranslation[0] = tr.x;
          that.graphTranslation[1] = tr.y;
          that.zoomFactor = tr.k;
        };
      })
      .on('end', function (){
        that.transformAnimation = false;
      })
      .attr('transform', 'translate(' + that.graphTranslation + ')scale(' + that.zoomFactor + ')')
      .ease(d3.easeLinear)
      .duration(250);
  }
}