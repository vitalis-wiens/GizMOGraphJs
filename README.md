# GizMOGraphJs
npm package for graph visualizations
###Currently setting up the development environment so do not expect anything yet.
## Installation 
-> Currently only as local npm package! <- 


you may require to use `npm link` to add it to your node reg.
Reference: 
https://dev.to/therealdanvega/creating-your-first-npm-package-2ehf

quick guide:
go to <PATH>/GizMOGraphJS `cd <PATH>/GizMOGraphJS`

call `npm link` // might require permissions 


Install as local npm package to you project
```
<PATH>/Examples/GizmoInReact$ npm install ../../GizMOGraphJS
 
```

inside your code

```javascript
import GizmoGraph from 'gizmo-graph';
const test= new GizmoGraph();
test.sayHello();

console output : "Hello World"
```