
document.addEventListener("DOMContentLoaded", function() {

  AFRAME.registerComponent('mygallery',{
    schema: {
      name: {type: 'string', default: ''},
      itemCount: {type: 'int', default: 2}
    },
    init: function () {
      var data = this.data;
      this.el.addEventListener('targetFound', event => {
        console.log("gallery target found");
        console.log(data.name);
            showGallery(data.name,data.itemCount,() => {
            });
      });
      this.el.addEventListener('targetLost', event => {
        console.log("gallery target lost");
      });
    }
  });

  const showGallery = (name,itemCount,done) =>{
    console.log(name);
    const gallery = document.querySelector("#"+name+"-panel");
    const galleryLeftButton = document.querySelector("#"+name+"-left-button");
    const galleryRightButton = document.querySelector("#"+name+"-right-button");

    let y = 0;
    let currentItem = 0;

    buildGallery(gallery,name,itemCount);
    gallery.setAttribute("visible", true);

    const showGalleryItem = (item) => {
      for (let i = 0; i < itemCount; i++) {
        console.log(item,i);
        document.querySelector("#"+name+"-item" + i).setAttribute("visible", i === item);
      }
    }

    const id = setInterval(() => {
      console.log("setInterval");
      y += 0.008;
      if (y >= 0.6) {
        clearInterval(id);
        galleryLeftButton.setAttribute("visible", true);
        galleryRightButton.setAttribute("visible", true);
       
        galleryLeftButton.addEventListener('click', () => {
          currentItem = (currentItem + 1) % itemCount;
          showGalleryItem(currentItem);
        });

        galleryRightButton.addEventListener('click', () => {
          currentItem = (currentItem - 1) % itemCount;
          showGalleryItem(currentItem);
        });

        setTimeout(() => {
          done();
        }, 500);
      }

    }, 10);
  }

  function buildGallery(parent,tag,itemCount){
    for (let index = 0; index < itemCount; index++) {
      var item = document.createElement('a-entity');
      item.setAttribute("id",tag+"-item"+index);
      var plane = document.createElement('a-plane');
      plane.setAttribute("class","clickable");
      plane.setAttribute("src","#"+tag+index);
      plane.setAttribute("position","0 0 0");
      plane.setAttribute("height","1");
      plane.setAttribute("width","0.7");
      plane.setAttribute("rotation","0 0 0");
      item.appendChild(plane)
      parent.appendChild(item)
    }
  }

});