	
document.addEventListener("DOMContentLoaded", function() {

    AFRAME.registerComponent('paint',{
      schema: {
        target: {type: 'string', default: ''}
      },
      init: function () {
        var data = this.data;
        createCanvas(data.target);
        var parent = document.querySelector(data.target);
        parent.texture = null
        // create the texture
        parent.texture = new THREE.CanvasTexture(canvas);
        console.log(parent);
        // get the references neccesary to swap the texture
        let mesh = parent.getObject3D('mesh')
        mesh.material.map = parent.texture
        // if there was a map before, you should dispose it
      },
      tick: function (){
        var data = this.data;
        var el = this.el;
        var target = data.target;
        var parent = document.querySelector(target);
        // if the texture is created - update it
         if (parent.texture) parent.texture.needsUpdate = true
      }
    });
    
    // SETTING ALL VARIABLES
    var isMouseDown=false;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var linesArray = [];
    currentSize = 10;
    var currentColor = "rgb(200,20,100)";
    var currentBg = "white";

     // detect touch capabilities
     var touchAvailable = ('createTouch' in document) || ('ontouchstart' in window);
    
     // attach the touchstart, touchmove, touchend event listeners.
     if(touchAvailable){
         canvas.addEventListener('touchstart', draw, false);
         canvas.addEventListener('touchmove', draw, false);
         canvas.addEventListener('touchend', draw, false);        
     }    
     // attach the mousedown, mousemove, mouseup event listeners.
     else {
         canvas.addEventListener('mousedown', draw, false);
         canvas.addEventListener('mousemove', draw, false);
         canvas.addEventListener('mouseup', draw, false);
     }

    function createCanvas(target) {
        var parent = document.querySelector(target);
        canvas.id = "canvas";
        canvas.width = window.innerWidth; //parseInt(document.getElementById("sizeX").value);
        canvas.height = window.innerHeight; //parseInt(document.getElementById("sizeY").value);
        canvas.style.zIndex = 8;
        canvas.style.position = "absolute";
        canvas.style.border = "1px solid";
        canvas.style.opacity = "0.0";
        context.fillStyle = currentBg;
        context.fillRect(0, 0, canvas.width, canvas.height);
        parent.appendChild(canvas);
    }

 
    // STORE DATA

    function store(x, y, s, c) {
        var line = {
            "x": x,
            "y": y,
            "size": s,
            "color": c
        }
        linesArray.push(line);
    }


     // create a drawer which tracks touch movements
     var drawer = {
        isDrawing: false,
        touchstart: function (coors) {
            context.beginPath();
            context.moveTo(coors.x, coors.y);
            this.isDrawing = true;
            context.lineWidth  = currentSize;
            context.lineCap = "round";
            context.strokeStyle = currentColor;
        },
        touchmove: function (coors) {
            if (this.isDrawing) {
                context.lineTo(coors.x, coors.y);
                context.stroke();
            }
        },
        touchend: function (coors) {
            if (this.isDrawing) {
                this.touchmove(coors);
                this.isDrawing = false;
                store();
            }
        }
    };
    // create a function to pass touch events and coordinates to drawer
    function draw(event) { 
        var type = null;
        // map mouse events to touch events
        switch(event.type){
            case "mousedown":
                    event.touches = [];
                    event.touches[0] = { 
                        pageX: event.pageX,
                        pageY: event.pageY
                    };
                    type = "touchstart";                  
            break;
            case "mousemove":                
                    event.touches = [];
                    event.touches[0] = { 
                        pageX: event.pageX,
                        pageY: event.pageY
                    };
                    type = "touchmove";                
            break;
            case "mouseup":                
                    event.touches = [];
                    event.touches[0] = { 
                        pageX: event.pageX,
                        pageY: event.pageY
                    };
                    type = "touchend";
            break;
        }    
        
        // touchend clear the touches[0], so we need to use changedTouches[0]
        var coors;
        if(event.type === "touchend") {
            coors = {
                x: event.changedTouches[0].pageX,
                y: event.changedTouches[0].pageY
            };
        }
        else {
            // get the touch coordinates
            coors = {
                x: event.touches[0].pageX,
                y: event.touches[0].pageY
            };
        }
        type = type || event.type
        // pass the coordinates to the appropriate handler
        drawer[type](coors);
    }

    // prevent elastic scrolling
    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false); // end body.onTouchMove

    // BUTTON EVENT HANDLERS

    /*document.getElementById('canvasUpdate').addEventListener('click', function() {
        createCanvas();
        redraw();
    });
    document.getElementById('colorpicker').addEventListener('change', function() {
        currentColor = this.value;
    });
    document.getElementById('bgcolorpicker').addEventListener('change', function() {
        ctx.fillStyle = this.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        redraw();
        currentBg = ctx.fillStyle;
    });
    document.getElementById('controlSize').addEventListener('change', function() {
        currentSize = this.value;
        document.getElementById("showSize").innerHTML = this.value;
    });
    document.getElementById('saveToImage').addEventListener('click', function() {
        downloadCanvas(this, 'canvas', 'masterpiece.png');
    }, false);
    document.getElementById('eraser').addEventListener('click', eraser);
    document.getElementById('clear').addEventListener('click', createCanvas);
    document.getElementById('save').addEventListener('click', save);
    document.getElementById('load').addEventListener('click', load);
    document.getElementById('clearCache').addEventListener('click', function() {
        localStorage.removeItem("savedCanvas");
        linesArray = [];
        console.log("Cache cleared!");
    });
   
    // REDRAW 
    function redraw() {
            for (var i = 1; i < linesArray.length; i++) {
                ctx.beginPath();
                ctx.moveTo(linesArray[i-1].x, linesArray[i-1].y);
                ctx.lineWidth  = linesArray[i].size;
                ctx.lineCap = "round";
                ctx.strokeStyle = linesArray[i].color;
                ctx.lineTo(linesArray[i].x, linesArray[i].y);
                ctx.stroke();
            }
    }
    */

    // DOWNLOAD CANVAS
    /*
    function downloadCanvas(link, canvas, filename) {
        link.href = document.getElementById(canvas).toDataURL();
        link.download = filename;
    }

    // SAVE FUNCTION

    function save() {
        localStorage.removeItem("savedCanvas");
        localStorage.setItem("savedCanvas", JSON.stringify(linesArray));
        console.log("Saved canvas!");
    }

    // LOAD FUNCTION

    function load() {
        if (localStorage.getItem("savedCanvas") != null) {
            linesArray = JSON.parse(localStorage.savedCanvas);
            var lines = JSON.parse(localStorage.getItem("savedCanvas"));
            for (var i = 1; i < lines.length; i++) {
                ctx.beginPath();
                ctx.moveTo(linesArray[i-1].x, linesArray[i-1].y);
                ctx.lineWidth  = linesArray[i].size;
                ctx.lineCap = "round";
                ctx.strokeStyle = linesArray[i].color;
                ctx.lineTo(linesArray[i].x, linesArray[i].y);
                ctx.stroke();
            }
            console.log("Canvas loaded.");
        }
        else {
            console.log("No canvas in memory!");
        }
    }

    // ERASER HANDLING

    function eraser() {
        currentSize = 50;
        currentColor = ctx.fillStyle
    }
*/

});