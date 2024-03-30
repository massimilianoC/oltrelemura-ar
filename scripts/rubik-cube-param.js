AFRAME.registerComponent('rubik-cube-param',{
    schema: {
        idx: {type: 'int', default: 0}
      },
    init: function () {
      var el = this.el;
      buildCubeFaces(this.data.idx,el);
    }
  });

  const LAST_ROTATION = [];

  function buildCubeFaces(idx,el){
    var newElement = document.createElement('a-entity');
    let groupCounter = 0;
    var r = idx;
      let rowCounter = 0;
      for (let i = 0; i < 3; i++) {
        let columnCounter = 0;
        for (let j = 0; j < 3; j++) {
            var newBlock = document.createElement('a-box');
            let faceCounter = 0;
            
            for (let axis = 0; axis < 3; axis++) {
                for (let direction = 0; direction < 2; direction++) {
                    var newPlane = document.createElement('a-plane');
                    var positionSign = ((direction==0 && axis==0) || (direction==1 && axis > 0)) ? '-' : '';
                    var rotationSing = direction==0 ? '-' : '';
                    var position = axis==0 ? positionSign+"0.5 0 0" : axis==1 ? "0 "+ positionSign+"0.5 0" : "0 0 "+positionSign+"0.5";
                    var rotation = axis==1 ? rotationSing+"90 0 0" : axis==0 ? "0 "+ rotationSing+"90 0" : "0 0 "+rotationSing+"90";
                    newPlane.setAttribute('position',position);
                    
                    //UP
                    if(i==2 && axis==1 && direction==0) 
                    {
                      newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+r+'_'+j+'.png)');
                    }
                    //DOWN
                    else if(i==0 && axis==1 && direction==1) 
                    {
                      newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileB_'+(2-r)+'_'+j+'.png)');
                    }
                     //LEFT
                    else if(j==0 && axis==0 && direction==0) 
                    {
                      newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileC_'+(2-i)+'_'+r+'.png)');
                      rotation = "0 -90 0";
                    }
                     //RIGHT
                    else if(j==2 && axis==0 && direction==1) 
                    {
                      newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+(2-i)+'_'+(2-r)+'.png)');
                      rotation = "0 90 0";
                    }
                    //FRONT
                    else if(r==2 && axis==2 && direction==0) 
                    {
                      newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileB_'+(2-i)+'_'+j+'.png)');
                      rotation = "0 0 0";
                    }
                    //BACK
                    else if(r==0 && axis==2 && direction==1) 
                    {
                      newPlane.setAttribute('material','shader:flat; side: double; src: url(../../../assets/texture/tileC_'+(2-i)+'_'+j+'.png)');
                      rotation = "0 0 0";
                    }
                    else {
                    newPlane.setAttribute('material','shader:flat ;side: double; color: #000');
                    }

                    newPlane.setAttribute("id","face_"+idx+"_"+i+"_"+j+"_"+axis+"_"+direction);
                    newPlane.setAttribute("class","clickable face");
                    newPlane.setAttribute('rotation',rotation);
                    newBlock.appendChild(newPlane);
                    
                    //events
                    newPlane.addEventListener("click", (e) => {
                      rotateParent(idx);
                      e.stopPropagation();
                      e.preventDefault()
                    },false);
                    faceCounter++;
                }           
            }
            var positionx = j==0 ? "-0.105" : j==1 ? "0" :"0.105" ;
            var positiony = i==0 ? "-0.105" : i==1 ? "0" :"0.105" ;
            var positionz = r==0 ? "-0.105" : r==1 ? "0" :"0.105" ;
            newBlock.setAttribute('id','block_'+r+'_'+i+'_'+j);
            newBlock.setAttribute('class',"block");
            newBlock.setAttribute('position',positionx+" "+positiony+ " "+positionz);
            newBlock.setAttribute('scale',"0.1 0.1 0.1");
            newBlock.setAttribute('opacity',"0");
            newBlock.setAttribute('width',"0.1");
            newBlock.setAttribute('height',"0.1");
            newBlock.setAttribute('depth',"0.1");
            newElement.appendChild(newBlock);
          
            columnCounter++;
        }
        rowCounter++;
      }
      groupCounter++;
    newElement.setAttribute('id','faces');
    el.appendChild(newElement);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rotateParent(idx){
    if(LAST_ROTATION.length<3) {
      LAST_ROTATION.push({x:0,y:0,z:0});
      LAST_ROTATION.push({x:0,y:0,z:0});
      LAST_ROTATION.push({x:0,y:0,z:0});
    }
    var cube = document.querySelector('#rubik'+idx);
    cube.removeAttribute("animation__dynamic"+idx);
    var dir = idx==1 ? -1 : 1;
    var newZ= LAST_ROTATION[idx].z+(dir*90);
    var oldZ = LAST_ROTATION[idx].z;
    var oldX = LAST_ROTATION[idx].x;
    var oldY = LAST_ROTATION[idx].y;
    cube.setAttribute("animation__dynamic"+idx,"property:rotation; enabled:true;elasticity:200;dur: 1000; from:"+oldX+" "+oldY+" "+oldZ+"; to: "+oldX+" "+oldY+" "+newZ);
    LAST_ROTATION[idx].z=newZ;

    cube.addEventListener("animationcomplete__dynamic"+idx,function(){
      console.log("END animationcomplete__dynamic"+idx);
      console.log(LAST_ROTATION[0],LAST_ROTATION[1],LAST_ROTATION[2]);

      if((LAST_ROTATION[0].z%360 == 0) && (LAST_ROTATION[1].z%360 == 0) && (LAST_ROTATION[2].z%360 == 0))
      {
        console.log("END animations");
        var faces = document.querySelectorAll('.face');
        let i=0;
        faces.forEach(face => {
          face.setAttribute("animation__fadeOut"+i,"property:opacity; enabled:true;from:1;to:0;dur: 100;delay:"+i*10);
          face.setAttribute("animation__fadeOutMaterial"+i,"property:visible; enabled:true;from:true;to:false;dur: 100;delay:"+i*200);
          i++;
        });

      }

    },{once:true})
}