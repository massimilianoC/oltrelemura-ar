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
                            newParent.appendChild(copyBlock(entity));
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
    console.log(src.position);
    console.log(src.rotation);
    console.log(src.material);
    copy.setAttribute("position",src.position);
    copy.setAttribute("rotation",src.rotation);
    copy.setAttribute("material",src.material);
    src.children.forEach(ch => {
        copy.appendChild(copyBlock(ch));
    });
    console.log(copy);
    return copy;
  }