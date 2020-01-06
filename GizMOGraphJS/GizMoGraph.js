import Manager from "./BaseClasses/testClass";
export default class GizMoGraphJs {
  constructor(){
    this.msg="Hello World!";
    this.CLASS_TYPE="GizMOGraph";
    this.manager=new Manager();
  }
  
  sayHello(){
    console.log(this.msg);
    this.manager.performTest();
  }
  
  showYourself(){
    console.log(this);
  }
}



