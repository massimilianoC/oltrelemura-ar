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

  const BLOCKS = document.querySelectorAll(".block");

  function rotateFace(data){
    console.log(BLOCKS);
    switch(data.face){
        case "FRONT":
            console.log("FRONT");
            BLOCKS.forEach(el => {
                console.log(el);
                console.log(VECTORS_FACE_FRONT);
                VECTORS_FACE_FRONT.forEach(ve => {
                    console.log(el.object3D.position);
                    console.log(ve);
                    if(el.object3D.position == ve)
                    {
                        console.log(MATCH);
                        el.parentElement.removeChild(el);
                        PIVOT_FRONT[0].appendChild(el);
                    }
                });
            });
            break;
        default:
        break;
    }
    //if(data.direction == 0)
    PIVOT_FRONT[0].setAttribute("animation",animation="property: rotation; to: 0 360 0; loop: true; dur: 10000");
  }