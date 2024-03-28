AFRAME.registerComponent('rubik-cube',{
  init: function () {
    var el = this.el;
    buildCubeFaces(el);
  }
});

const FACES = [];
const VECTORS = [];
const ROTATIONS = [];

const labelUP = "UP";
const labelDOWN = "DOWN";
const labelFRONT = "FRONT";
const labelBACK = "BACK";
const labelLEFT = "LEFT";
const labelRIGHT = "RIGHT";

function buildCubeFaces(el){
  let newElement = document.createElement('a-entity');
  let groupCounter = 0;
  for (let r = 0; r < 3; r++) {
    let rowCounter = 0;
    for (let i = 0; i < 3; i++) {
      let columnCounter = 0;
      for (let j = 0; j < 3; j++) {
          let newPivot = document.createElement('a-entity');
          let newBlock = document.createElement('a-box');
          let faceCounter = 0;
          for (let axis = 0; axis < 3; axis++) {
              for (let direction = 0; direction < 2; direction++) {
                  
                  var positionSign = ((direction==0 && axis==0) || (direction==1 && axis > 0)) ? '-' : '';
                  var rotationSing = direction==0 ? '-' : '';
                  var position = axis==0 ? positionSign+"0.5 0 0" : axis==1 ? "0 "+ positionSign+"0.5 0" : "0 0 "+positionSign+"0.5";
                  var rotation = axis==1 ? rotationSing+"90 0 0" : axis==0 ? "0 "+ rotationSing+"90 0" : "0 0 "+rotationSing+"90";
                  var positionx = j==0 ? "-0.105" : j==1 ? "0" :"0.105" ;
                  var positiony = i==0 ? "-0.105" : i==1 ? "0" :"0.105" ;
                  var positionz = r==0 ? "-0.105" : r==1 ? "0" :"0.105" ;
                  
                  newPivot.setAttribute('id','pivot_'+r+'_'+i+'_'+j);
                  newBlock.setAttribute("face","");

                  newBlock.setAttribute("faceX","");
                  newBlock.setAttribute("faceY","");
                  newBlock.setAttribute("faceZ","");

                  newBlock.setAttribute('id','block_'+r+'_'+i+'_'+j);
                  newBlock.setAttribute('class',"block");
                  newBlock.setAttribute('position',positionx+" "+positiony+ " "+positionz);
                  newBlock.setAttribute('scale',"0.1 0.1 0.1");
                  newBlock.setAttribute('width',"0.1");
                  newBlock.setAttribute('height',"0.1");
                  newBlock.setAttribute('depth',"0.1");

                  var newPlane = document.createElement('a-plane');
                  newPlane.setAttribute('position',position);
                  newPlane.setAttribute("id","face_"+r+"_"+i+"_"+j+"_"+axis+"_"+direction);

                  //UP
                  if(i==2 && axis==1 && direction==0) 
                  {
                    newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+r+'_'+j+'.png)');
                    newPlane.setAttribute("face",labelUP);
                  }
                  //DOWN
                  else if(i==0 && axis==1 && direction==1) 
                  {
                    newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+(2-r)+'_'+j+'.png)');
                    newPlane.setAttribute("face",labelDOWN);
                  }
                   //LEFT
                  else if(j==0 && axis==0 && direction==0) 
                  {
                    newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+(2-i)+'_'+r+'.png)');
                    newPlane.setAttribute("face",labelLEFT);
                    rotation = "0 -90 0";
                  }
                   //RIGHT
                  else if(j==2 && axis==0 && direction==1) 
                  {
                    newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+(2-i)+'_'+(2-r)+'.png)');
                    newPlane.setAttribute("face",labelRIGHT);
                    rotation = "0 90 0";
                  }
                  //FRONT
                  else if(r==2 && axis==2 && direction==0) 
                  {
                    newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+(2-i)+'_'+j+'.png)');
                    newPlane.setAttribute("face",labelFRONT);
                    rotation = "0 0 0";
                  }
                  //BACK
                  else if(r==0 && axis==2 && direction==1) 
                  {
                    newPlane.setAttribute('material','shader:flat; side: double ; src: url(../../../assets/texture/tileA_'+(2-i)+'_'+j+'.png)');
                    newPlane.setAttribute("face",labelBACK);
                    rotation = "0 0 0";
                  }
                  else {
                  newPlane.setAttribute('material','shader:flat ;side: double; color: #000');
                  }

                  newPlane.setAttribute("class",newPlane.className+" clickable face");
                  newPlane.setAttribute('rotation',rotation);
                  newBlock.appendChild(newPlane);
                  
                  //click events
                  newPlane.addEventListener("click", (e) => {
                    var mouseEvent = e.detail.mouseEvent;
                    rotateFace(newBlock);
                    e.stopPropagation();
                    e.preventDefault();
                    console.log(newPlane.id);
                  },false);
                  faceCounter++;
              }           
          }

          //INIT FACES VECTORS
          //UP
          if(i==2) 
          {
            newBlock.setAttribute("faceX",labelUP);
          }
          //DOWN
          if(i==0) 
          {
            newBlock.setAttribute("faceX",labelDOWN);
          }
           //LEFT
          if(j==0) 
          {
            newBlock.setAttribute("faceY",labelLEFT);
          }
           //RIGHT
          if(j==2) 
          {
            newBlock.setAttribute("faceY",labelRIGHT);
          }
          //FRONT
          if(r==2) 
          {
            newBlock.setAttribute("faceZ",labelFRONT);
          }
          //BACK
          if(r==0) 
          {
            newBlock.setAttribute("faceZ",labelBACK);
          }
          
          newBlock.setAttribute("face",newBlock.getAttribute("faceX")+" "+newBlock.getAttribute("faceY")+" "+newBlock.getAttribute("faceZ"));
          newPivot.appendChild(newBlock);
          newElement.appendChild(newPivot);
          columnCounter++;
      }
      rowCounter++;
    }
    groupCounter++;
  }
  newElement.setAttribute('id','cube');
  el.appendChild(newElement);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rotateFace(block){
  var currentFaces = block.getAttribute("face").trim().split(' ');
  var rotationFace = currentFaces[0];
  var siblings = document.querySelectorAll("a-box[face*='"+rotationFace+"']");
  console.log(block.id)
  console.log("BLOCK IN "+currentFaces);
  console.log("ROTATE "+rotationFace);

  siblings.forEach(el => {
    console.log(el.id)

    var pivot = el.parentElement;

    if(!ROTATIONS[pivot.id]){
      ROTATIONS[pivot.id]={x:0,y:0,z:0}}

    pivot.removeAttribute("animation__dynamic"+pivot.id);

    var oldZ = ROTATIONS[pivot.id].z;
    var oldX = ROTATIONS[pivot.id].x;
    var oldY = ROTATIONS[pivot.id].y;   
    var newX = (oldX + ((rotationFace.trim()==labelLEFT) || (rotationFace.trim()==labelRIGHT)? 90 : 0));
    var newY = (oldY + ((rotationFace.trim()==labelDOWN) ||(rotationFace.trim()==labelUP) ? 90 : 0));
    var newZ = (oldZ + ((rotationFace.trim()==labelFRONT) || (rotationFace.trim()==labelBACK)? 90 : 0));
    
    pivot.setAttribute("animation__dynamic"+pivot.id,"property:rotation; enabled:true;elasticity:200;dur: 1000; from:"+oldX+" "+oldY+" "+oldZ+"; to: "+newX+" "+newY+" "+newZ);
  
    ROTATIONS[pivot.id].z=newZ;
    ROTATIONS[pivot.id].x=newX;
    ROTATIONS[pivot.id].y=newY;

    var rotationDir = {x:el.getAttribute("faceX"),y:el.getAttribute("faceY"),z:el.getAttribute("faceZ")}
    console.log("START",el.id,el.getAttribute("face"));
    el.setAttribute("face","");

    if(rotationFace.trim()==labelDOWN || rotationFace.trim()==labelUP)
    {
      if(rotationDir.y == labelLEFT && rotationDir.z == "") {
        rotationDir.y = "";
        rotationDir.z = labelFRONT;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.y == labelRIGHT && rotationDir.z == "") {
        rotationDir.y = "";
        rotationDir.z = labelBACK;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.y == "" && rotationDir.z == labelFRONT) {
        rotationDir.y = labelRIGHT;
        rotationDir.z = "";
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.y == "" && rotationDir.z == labelBACK) {
        rotationDir.y = labelLEFT;
        rotationDir.z = "";
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      //corners
      if(rotationDir.y == labelLEFT && rotationDir.z == labelFRONT) {
        rotationDir.y = labelRIGHT;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.y == labelLEFT && rotationDir.z == labelBACK) {
        rotationDir.z = labelFRONT;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.y == labelRIGHT && rotationDir.z == labelFRONT) {
        rotationDir.z = labelBACK;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.y == labelRIGHT && rotationDir.z == labelBACK) {
        rotationDir.y = labelLEFT;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }
    }

    if(rotationFace.trim()==labelLEFT || rotationFace.trim()==labelRIGHT)
    {
      if(rotationDir.x == labelDOWN && rotationDir.z == "") {
        rotationDir.x = "";
        rotationDir.z = labelBACK;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.x == labelUP && rotationDir.z == "") {
        rotationDir.x = "";
        rotationDir.z = labelFRONT;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.x == " "&& rotationDir.z == labelFRONT) {
        rotationDir.x = labelDOWN;
        rotationDir.z = "";
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.x == "" && rotationDir.z == labelBACK) {
        rotationDir.x = labelUP;
        rotationDir.z = "";
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      //corners
      if(rotationDir.x == labelDOWN && rotationDir.z == labelFRONT) {
        rotationDir.x = labelUP;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.x == labelDOWN && rotationDir.z == labelBACK) {
        rotationDir.z = labelFRONT;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.x == labelUP && rotationDir.z == labelFRONT) {
        rotationDir.z = labelBACK;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.x == labelUP && rotationDir.z == labelBACK) {
        rotationDir.x = labelDOWN;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }
    }

    if(rotationFace.trim()==labelFRONT || rotationFace.trim()==labelBACK)
    {
      if(rotationDir.x == labelDOWN && rotationDir.y == "") {
        rotationDir.x = "";
        rotationDir.y = labelRIGHT;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.x == labelUP && rotationDir.y == "") {
        rotationDir.x = "";
        rotationDir.y = labelLEFT;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.x == "" && rotationDir.y == labelRIGHT) {
        rotationDir.x = labelUP;
        rotationDir.y = "";
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.x == "" && rotationDir.y == labelLEFT) {
        rotationDir.x = labelDOWN;
        rotationDir.y = "";
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      //corners
      if(rotationDir.y == labelLEFT && rotationDir.x == labelDOWN) {
        rotationDir.y = labelRIGHT;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.y == labelLEFT && rotationDir.x == labelUP) {
        rotationDir.x = labelDOWN;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.y == labelRIGHT && rotationDir.x == labelDOWN) {
        rotationDir.x = labelUP;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }

      if(rotationDir.y == labelRIGHT && rotationDir.x == labelUP) {
        rotationDir.y = labelLEFT;
        console.log("rotate",rotationDir.x,rotationDir.y,rotationDir.z);
      }
    }

    el.setAttribute("faceX",rotationDir.x);
    el.setAttribute("faceY",rotationDir.y);
    el.setAttribute("faceZ",rotationDir.z);

    el.setAttribute("face",el.getAttribute("faceX")+" "+el.getAttribute("faceY")+" "+el.getAttribute("faceZ"));

    console.log("END",el.id,el.getAttribute("face"));
    pivot.addEventListener("animationcomplete__dynamic"+pivot.id,function(){
      //animation ended
    },false);
  }); 
}