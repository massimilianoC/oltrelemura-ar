AFRAME.registerComponent('rubik-cube',{
    init: function () {
      var el = this.el;
      buildCubeFaces(el);
      buildCubeStructure(el);
      buildCubePivot(el);
    }
  });

  const UP=[]; //i==0, c==2, p==0
  const DOWN=[]; //i==2, c==2, p==1
  const LEFT=[]; //j==0, c==1, p==1
  const RIGHT=[]; //j==2,c==2, p==0
  const FRONT=[]; //r==2, c==0, p==0
  const BACK=[]; //r==0, c==0, p==1

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
                    newPlane.setAttribute('rotation',rotation);
                    //newPlane.setAttribute('material','shader:flat ;side: double');
                    //newPlane.setAttribute('src','#opera'+(8-axis-direction));
                    
                    /*
                    //UP
                    if(i==0, axis==2, direction==0) 
                    {
                      newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+r+'_'+j+'.png)');
                    }

                    //DOWN
                    if(i==2, axis==2, direction==1) 
                    {
                      newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+r+'_'+j+'.png)');
                    }

                    //LEFT
                    if(j==0, axis==1, direction==1) 
                    {
                      newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+r+'_'+i+'.png)');
                    }

                    //RIGHT
                    if(j==0, axis==1, direction==1) 
                    {
                      newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+r+'_'+i+'.png)');
                    }*/

                    //FRONT
                    if(r==2, axis==0, direction==0) 
                    {
                      newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+i+'_'+j+'.png)');
                    }

                    /*
                    //BACK
                    if(r==0, axis==0, direction=1) 
                    {
                      newPlane.setAttribute('material','shader:flat ; src: url(../../../assets/texture/tileA_'+i+'_'+j+'.png)');
                    }
                    */

                    console.log(groupCounter+'_'+rowCounter+'_'+columnCounter+'_'+faceCounter);
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