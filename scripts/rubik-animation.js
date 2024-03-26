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
    switch(data.face){
        case "FRONT":
            console.log("FRONT");
            BLOCKS.forEach(el => {
                VECTORS_FACE_FRONT.forEach(ve => {
                    console.log(el.object3D.position);
                    console.log(ve);
                    if(el.object3D.position == ve)
                    {
                        console.log(MATCH);
                        el.parentElement.removeChild(el);
                        PIVOT_FRONT.appendChild(el);
                    }
                });
            });
            break;
        default:
        break;
    }
    PIVOT_FRONT.setAttribute("animation",animation="property: rotation; to: 0 360 0; loop: true; dur: 10000");
  }