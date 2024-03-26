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
                            changeParent(el,newParent);
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

  function changeParent(child,newParent){
    const el = child;
    const parent = newParent;

    if (el.parentElement == parent) {
      // We're already a child of the intended parent, do nothing
      return;
    };

    // Reparent, once object3D is ready
    reparent = function() {
      // Attach the object3D to the new parent, to get position, rotation, scale
      parent.object3D.attach(el.object3D);
      let position = el.object3D.position;
      let rotation = el.object3D.rotation;
      let scale = el.object3D.scale;

      // Create new element, copy the current one on it
      let newEl = document.createElement(el.tagName);
      if (el.hasAttributes()) {
        let attrs = el.attributes;
        for(var i = attrs.length - 1; i >= 0; i--) {
          let attrName = attrs[i].name;
          let attrVal = el.getAttribute(attrName);
          newEl.setAttribute(attrName, attrVal);
        };
      };

      // Listener for location, rotation,... when the new el is laded
      relocate = function() {
        newEl.object3D.location = location;
        newEl.object3D.rotation = rotation;
        newEl.object3D.scale = scale;
      };

      newEl.addEventListener('loaded', relocate, {'once': true});
      // Attach the new element, and remove this one
      parent.appendChild(newEl);
      el.parentElement.removeChild(el);
    };

    if (el.getObject3D('mesh')) {
      reparent();
    } else {
      el.sceneEl.addEventListener('object3dset', reparent, {'once': true});
    };
  }

});