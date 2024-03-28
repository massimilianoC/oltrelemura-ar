AFRAME.registerComponent('rubik-cube',{
  init: function () {
    var el = this.el;
    buildCubeFaces(el);
  }
});

const FACES = [];
const VECTORS = [];
const ROTATIONS = [];

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
                    newPlane.setAttribute("face","up");
                    FACES["UP"] = {x:positionx,y:positiony,z:positionz};
                  }
                  //DOWN
                  else if(i==0 && axis==1 && direction==1) 
                  {
                    newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+(2-r)+'_'+j+'.png)');
                    newPlane.setAttribute("face","down");
                    FACES["DOWN"] = {x:positionx,y:positiony,z:positionz};
                  }
                   //LEFT
                  else if(j==0 && axis==0 && direction==0) 
                  {
                    newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+(2-i)+'_'+r+'.png)');
                    newPlane.setAttribute("face","left");
                    rotation = "0 -90 0";
                    FACES["LEFT"] = {x:positionx,y:positiony,z:positionz};
                  }
                   //RIGHT
                  else if(j==2 && axis==0 && direction==1) 
                  {
                    newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+(2-i)+'_'+(2-r)+'.png)');
                    newPlane.setAttribute("face","right");
                    rotation = "0 90 0";
                    FACES["RIGHT"] = {x:positionx,y:positiony,z:positionz};
                  }
                  //FRONT
                  else if(r==2 && axis==2 && direction==0) 
                  {
                    newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+(2-i)+'_'+j+'.png)');
                    newPlane.setAttribute("face","front");
                    rotation = "0 0 0";
                    FACES["FRONT"] = {x:positionx,y:positiony,z:positionz};
                  }
                  //BACK
                  else if(r==0 && axis==2 && direction==1) 
                  {
                    newPlane.setAttribute('material','shader:flat; side: double ; src: url(../../../assets/texture/tileA_'+(2-i)+'_'+j+'.png)');
                    newPlane.setAttribute("face","back");
                    rotation = "0 0 0";
                    FACES["BACK"] = {x:positionx,y:positiony,z:positionz};
                  }
                  else {
                  newPlane.setAttribute('material','shader:flat ;side: double; color: #000');
                  }

                  newPlane.setAttribute("class",newPlane.className+" clickable face");
                  newPlane.setAttribute('rotation',rotation);
                  newBlock.appendChild(newPlane);
                  
                  //rotation events
                  newPlane.addEventListener("click", (e) => {
                    console.log(newPlane.id);
                    rotateFace(newBlock,direction);
                    e.stopPropagation();
                    e.preventDefault()
                  },false);
                  faceCounter++;
              }           
          }
          
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

function rotateFace(block,direction){
  var pivot = block.parentElement;
  console.log(block.id);
  console.log(pivot.id);

  if(!ROTATIONS[pivot.id]){
    ROTATIONS[pivot.id]={x:0,y:0,z:0}
  }
 
  pivot.removeAttribute("animation__dynamic"+pivot.id);
  
  var oldZ = ROTATIONS[pivot.id].z;
  var oldX = ROTATIONS[pivot.id].x;
  var oldY = ROTATIONS[pivot.id].y;
  var newX = oldX + 90;
  var newY = oldY + 90;
  var newZ = oldZ + 90;
  
  pivot.setAttribute("animation__dynamic"+pivot.id,"property:rotation; enabled:true;elasticity:200;dur: 1000; from:"+oldX+" "+oldY+" "+oldZ+"; to: "+newX+" "+newY+" "+newZ);
 
  ROTATIONS[pivot.id].z=newZ;
  ROTATIONS[pivot.id].x=newX;
  ROTATIONS[pivot.id].y=newY;

  pivot.addEventListener("animationcomplete__dynamic"+pivot.id,function(){
    //rebuildFaces
  },{once:true});
}