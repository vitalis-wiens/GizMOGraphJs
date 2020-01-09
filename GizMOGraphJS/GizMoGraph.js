//@flow
import Manager from "./Managers/Manager";
export default class GizMoGraphJs {
  constructor(){
    this.msg="Hello World!";
    this.CLASS_TYPE="GizMOGraph";
    this.manager=new Manager();
  }
  
  sayHello(){
    console.log(this.msg);
    
  }
  
  showYourself(){
    console.log(this);
  }
  
  
  setDivId(divId){
    this.manager.setDivId(divId);
  }
  
  setRenderingEngine(ren){
    this.manager.setRenderingEngineType(ren);
  }
  
  setGraphSize(w,h){
    this.manager.updateGraphSize(w,h);
  }
  
  renderExampleGraph(){
    this.manager.renderExampleGraph();
  }
  
  
}



