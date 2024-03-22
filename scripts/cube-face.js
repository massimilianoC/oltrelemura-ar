AFRAME.registerComponent('cube-face',{
    schema: {
        idx: {type: 'string', default: ''}
      },
    init: function () {
      var el = this.el;
      var idx = this.data.idx;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            var newBlock = document.createElement('a-entity');
            for (let c = 0; c < 3; c++) {
                for (let p = 0; p < 2; p++) {
                    var newPlane = document.createElement('a-plane');
                    var positionSign = ((p==0 && c==0) || (p==1 && c > 0)) ? '-0.5' : '0.5';
                    var rotationSing = p==0 ? '-90' : '90';
                    var position = c==0 ? positionSign+" 0 0" : c==1 ? "0 "+ positionSign+" 0" : "0 0 "+positionSign;
                    var rotation = c==1 ? rotationSing+" 0 0" : c==0 ? "0 "+ rotationSing+" 0" : "0 0 "+rotationSing;
                    newPlane.setAttribute('material','side: double');
                    newPlane.setAttribute('position',position);
                    newPlane.setAttribute('rotation',rotation);
                    newPlane.setAttribute('src','#opera'+getRandomInt(1,8));
                    newBlock.appendChild(newPlane);
                    console.log(newPlane);
                }           
            }
            var positionx = j==0 ? "0" : j==1 ? "0.105" :"-0.105" ;
            var positiony = i==0 ? "0" : i==1 ? "0.105" :"-0.105" ;
            newBlock.setAttribute('id','block'+idx+'-'+i+'_'+j);
            newBlock.setAttribute('position',positionx+" "+positiony+ " 0");
            newBlock.setAttribute('scale',"0.1 0.1 0.1");
            el.appendChild(newBlock);
            console.log(newBlock);
            console.log(positionx+" "+positiony+ " 0");
        }
      }
    }
  });

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}