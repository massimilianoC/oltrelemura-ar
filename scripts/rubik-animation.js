document.addEventListener("DOMContentLoaded", function() {


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
                            var newParent = document.querySelector('#pivot');
                            console.log(el.object3D);
                        }
                    });
                });
                break;
            default:
            break;
        }
        //if(data.direction == 0)
        PIVOT_FRONT[0].setAttribute("animation",animation="property: rotation; to: 0 0 360; loop: true; dur: 5000");
    }, "1000");
  }

});