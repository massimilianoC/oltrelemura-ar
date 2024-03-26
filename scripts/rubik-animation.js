AFRAME.registerComponent('rubik-animation',{
    schema: {
        face: {type: 'string', default: ''},
        direction: {type: 'int', default: 0}
      },
    update: function (oldData) {
        var el = this.el;
        var data = this.data;  
        rotateFace(data);
    }
  });

  var BLOCKS = [];

  function rotateFace(data){
    setTimeout(()  => {
        BLOCKS = document.querySelectorAll(".block");
        console.log(BLOCKS);
        switch(data.face){
            case "FRONT":
                console.log("FRONT");
                BLOCKS.forEach(el => {
                    //console.log(el);
                    console.log(VECTORS_FACE_FRONT);
                    VECTORS_FACE_FRONT.forEach(ve => {
                        console.log(el.object3D.position);
                        console.log(ve);
                        if(el.object3D.position.x == ve.x && 
                            el.object3D.position.y == ve.y && 
                            el.object3D.position.z == ve.z )
                        {
                            console.log("MATCH");
                            var entity = el;
                            console.log(entity);
                            var newParent = document.querySelector('#pivot');
                            PIVOT_FRONT[0].appendChild(copyBlock(entity));
                            entity.parentNode.removeChild(entity);
                        }
                    });
                });
                break;
            default:
            break;
        }
        //if(data.direction == 0)
        PIVOT_FRONT[0].setAttribute("animation",animation="property: rotation; to: 360 0 0; loop: true; dur: 10000");
    }, "1000");
  }

  function copyBlock(src){
    var copy = src.cloneNode();
    
    console.log(src.id);
    console.log(src.object3D.position);
    console.log(src.object3D.rotation);
    console.log(src.object3D.material);
    
    //Copy position
    copy.object3D.position.set(src.object3D.position.x,src.object3D.position.y,src.object3D.position.z);
    //Copy rotation
    el.object3D.rotation.set(
        THREE.MathUtils.degToRad(src.object3D.rotation.x),
        THREE.MathUtils.degToRad(src.object3D.rotation.y),
        THREE.MathUtils.degToRad(src.object3D.rotation.z)
      );
      el.object3D.rotation.x += Math.PI;
    //Copy material
    copy.object3D.material.set(src.object3D.material);

    var children= src.children;
    console.log(children);
    for (let i = 0; i < children.length; i++) {
        copy.appendChild(copyBlock(children[i]));
      }
    console.log(copy);
    return copy;
  }