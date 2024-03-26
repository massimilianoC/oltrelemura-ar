AFRAME.registerComponent('rubik-cube',{
    init: function () {
      var el = this.el;
      buildCubeFaces(el);
      buildCubeStructure(el);
      buildCubePivot(el);
    }
  });

  const FACE_UP=[]; //i==2 && axis==1 && direction==0
  const FACE_DOWN=[]; //i==0 && axis==1 && direction==1
  const FACE_LEFT=[]; //j==0 && axis==0 && direction==0
  const FACE_RIGHT=[]; //j==2 && axis==0 && direction==1
  const FACE_FRONT=[]; //r==2 && axis==2 && direction==0
  const FACE_BACK=[]; //r==0 && axis==2 && direction==1

  const BLOCK_UP=[]; //i==2 && axis==1 && direction==0
  const BLOCK_DOWN=[]; //i==0 && axis==1 && direction==1
  const BLOCK_LEFT=[]; //j==0 && axis==0 && direction==0
  const BLOCK_RIGHT=[]; //j==2 && axis==0 && direction==1
  const BLOCK_FRONT=[]; //r==2 && axis==2 && direction==0
  const BLOCK_BACK=[]; //r==0 && axis==2 && direction==1
  const BLOCK_CORE = [];

  const VECTORS_FACE_UP = [];
  const VECTORS_FACE_DOWN = [];
  const VECTORS_FACE_RIGHT = [];
  const VECTORS_FACE_LEFT = [];
  const VECTORS_FACE_FRONT = [];
  const VECTORS_FACE_BACK = [];

  function buildCubeFaces(el){
    var newElement = document.createElement('a-entity');
    let groupCounter = 0;
    for (let r = 0; r < 3; r++) {
      let rowCounter = 0;
      for (let i = 0; i < 3; i++) {
        let columnCounter = 0;
        for (let j = 0; j < 3; j++) {
            var newBlock = document.createElement('a-box');
            var faceSrcIndex = getRandomInt(3,8);
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
                      FACE_UP.push(newPlane);
                    }
                    //DOWN
                    else if(i==0 && axis==1 && direction==1) 
                    {
                      newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+(2-r)+'_'+j+'.png)');
                      FACE_DOWN.push(newPlane);
                    }
                     //LEFT
                    else if(j==0 && axis==0 && direction==0) 
                    {
                      newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+(2-i)+'_'+r+'.png)');
                      rotation = "0 -90 0";
                      FACE_LEFT.push(newPlane);
                    }
                     //RIGHT
                    else if(j==2 && axis==0 && direction==1) 
                    {
                      newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+(2-i)+'_'+(2-r)+'.png)');
                      rotation = "0 90 0";
                      FACE_RIGHT.push(newPlane);
                    }
                    //FRONT
                    else if(r==2 && axis==2 && direction==0) 
                    {
                      newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+(2-i)+'_'+j+'.png)');
                      rotation = "0 0 0";
                      FACE_FRONT.push(newPlane);
                    }
                    //BACK
                    else if(r==0 && axis==2 && direction==1) 
                    {
                      newPlane.setAttribute('material','shader:flat; side: double ; src: url(../../../assets/texture/tileA_'+(2-i)+'_'+j+'.png)');
                      rotation = "0 0 0";
                      FACE_BACK.push(newPlane);
                    }
                    else {
                    newPlane.setAttribute('material','shader:flat ;side: double; color: #000');
                    }

                    console.log(groupCounter+'_'+rowCounter+'_'+columnCounter+'_'+faceCounter);

                    newPlane.setAttribute('rotation',rotation);
                    newBlock.appendChild(newPlane);
                    faceCounter++;
                }           
            }
            var positionx = j==0 ? "-0.105" : j==1 ? "0" :"0.105" ;
            var positiony = i==0 ? "-0.105" : i==1 ? "0" :"0.105" ;
            var positionz = r==0 ? "-0.105" : r==1 ? "0" :"0.105" ;
            newBlock.setAttribute('id','block_'+r+'_'+i+'_'+j);
            newBlock.setAttribute('position',positionx+" "+positiony+ " "+positionz);
            newBlock.setAttribute('scale',"0.1 0.1 0.1");
            newBlock.setAttribute('width',"0.1");
            newBlock.setAttribute('height',"0.1");
            newBlock.setAttribute('depth',"0.1");
            newElement.appendChild(newBlock);
            console.log(newBlock);
            console.log(positionx+" "+positiony+ " 0");

            var refVector= new THREE.Vector3();
             //UP
             if(i==2) 
             {
              BLOCK_UP.push(newBlock);
              VECTORS_FACE_UP.push(refVector.copy(newBlock.object3D.position));
             }
             //DOWN
             else if(i==0) 
             {
              BLOCK_DOWN.push(newBlock);
              VECTORS_FACE_DOWN.push(refVector.copy(newBlock.object3D.position));
             }
              //LEFT
             else if(j==0) 
             {
               BLOCK_LEFT.push(newBlock);
               VECTORS_FACE_LEFT.push(refVector.copy(newBlock.object3D.position));
             }
              //RIGHT
             else if(j==2) 
             {
               BLOCK_RIGHT.push(newBlock);
               VECTORS_FACE_RIGHT.push(refVector.copy(newBlock.object3D.position));
             }
             //FRONT
             else if(r==2) 
             {
               BLOCK_FRONT.push(newBlock);
               VECTORS_FACE_FRONT.push(refVector.copy(newBlock.object3D.position));
             }
             //BACK
             else if(r==0) 
             {
               BLOCK_BACK.push(newBlock);
               VECTORS_FACE_BACK.push(refVector.copy(newBlock.object3D.position));
             }
             else {
              BLOCK_CORE.push(newBlock);
             }

            columnCounter++;
        }
        rowCounter++;
      }
      groupCounter++;
    }
    newElement.setAttribute('id','faces');
    el.appendChild(newElement);
  }

  function buildCubeStructure(el){
    var newElement = document.createElement('a-entity');
    for (let r = 0; r < 3; r++) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            var newBlock = document.createElement('a-box');
            var positionx = j==0 ? "0" : j==1 ? "0.105" :"-0.105" ;
            var positiony = i==0 ? "0" : i==1 ? "0.105" :"-0.105" ;
            var positionz = r==0 ? "0" : r==1 ? "0.105" :"-0.105" ;
            newBlock.setAttribute('id','struct_'+r+'_'+i+'_'+j);
            newBlock.setAttribute('position',positionx+" "+positiony+ " "+positionz);
            newBlock.setAttribute('scale',"0.1 0.1 0.1");
            newBlock.setAttribute('width',"0.1");
            newBlock.setAttribute('height',"0.1");
            newBlock.setAttribute('depth',"0.1");
            newElement.appendChild(newBlock);
            console.log(newBlock);
            console.log(positionx+" "+positiony+ " 0");
        }
      }
    }
    newElement.setAttribute('id','structure');
    el.appendChild(newElement);
  }

  // TODO -> pivot devev contenere le posizioni da ruotare
  // Alla rotazione, Pivot "prende" i block che matchano con posizioni come suoi figli 
  // A fine di ogni rotazione, tutti i Block tornano figli di faces
  function buildCubePivot(el){
    var newElement = document.createElement('a-entity');
    for (let r = 0; r < 3; r++) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            var newBlock = document.createElement('a-box');
            var positionx = j==0 ? "0" : j==1 ? "0.105" :"-0.105" ;
            var positiony = i==0 ? "0" : i==1 ? "0.105" :"-0.105" ;
            var positionz = r==0 ? "0" : r==1 ? "0.105" :"-0.105" ;
            newBlock.setAttribute('id','pivot_'+r+'_'+i+'_'+j);
            newBlock.setAttribute('position',positionx+" "+positiony+ " "+positionz);
            newBlock.setAttribute('scale',"0.1 0.1 0.1");
            newBlock.setAttribute('width',"0.1");
            newBlock.setAttribute('height',"0.1");
            newBlock.setAttribute('depth',"0.1");
            newElement.appendChild(newBlock);
            console.log(newBlock);
            console.log(positionx+" "+positiony+ " 0");
        }
      }
    }
    newElement.setAttribute('id','pivot');
    el.appendChild(newElement);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}