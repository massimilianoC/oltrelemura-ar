
document.addEventListener("DOMContentLoaded", function() {

const showInfo = () => {
    /*
    let y = 0;
    const profileButton = document.querySelector("#profile-button");
    const webButton = document.querySelector("#web-button");
    const emailButton = document.querySelector("#email-button");
    const locationButton = document.querySelector("#location-button");
    const text = document.querySelector("#text");

    
    profileButton.setAttribute("visible", true);
    setTimeout(() => {
      webButton.setAttribute("visible", true);
    }, 300);
    setTimeout(() => {
      emailButton.setAttribute("visible", true);
    }, 600);
    setTimeout(() => {
      locationButton.setAttribute("visible", true);
    }, 900);

    let currentTab = '';
    webButton.addEventListener('click', function (evt) {
      text.setAttribute("value", "https://softmind.tech");
      currentTab = 'web';
    });
    emailButton.addEventListener('click', function (evt) {
      text.setAttribute("value", "hello@softmind.tech");
      currentTab = 'email';
    });
    profileButton.addEventListener('click', function (evt) {
      text.setAttribute("value", "AR, VR solutions and consultation");
      currentTab = 'profile';
    });
    locationButton.addEventListener('click', function (evt) {
      console.log("loc");
      text.setAttribute("value", "Vancouver, Canada | Hong Kong");
      currentTab = 'location';
    });

    text.addEventListener('click', function (evt) {
      if (currentTab === 'web') {
        window.location.href="https://softmind.tech";
      }
    });
    */
  }

  const showGallery = (name,done) => {
    console.log(name);
    const gallery = document.querySelector("#"+name+"-panel");
    const galleryLeftButton = document.querySelector("#"+name+"-left-button");
    const galleryRightButton = document.querySelector("#"+name+"-right-button");

    let y = 0;
    let currentItem = 0;

    gallery.setAttribute("visible", true);

    const showGalleryItem = (item) => {
      for (let i = 0; i <= 2; i++) {
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
          currentItem = (currentItem + 1) % 3;
          showGalleryItem(currentItem);
        });

        galleryRightButton.addEventListener('click', () => {
          currentItem = (currentItem - 1 + 3) % 3;
          showGalleryItem(currentItem);
        });

        setTimeout(() => {
          done();
        }, 500);
      }

      gallery.setAttribute("position", "0 " + y + " -0.01");

    }, 10);
  }


  AFRAME.registerComponent('mygallery',{
    schema: {
      name: {type: 'string', default: ''}
    },
    init: function () {
      var data = this.data;
      this.el.addEventListener('targetFound', event => {
        console.log("component target found");
        console.log(data.name);
            showGallery(data.name,() => {
              setTimeout(() => {
                showInfo();
              }, 300);
            });
      });
      this.el.addEventListener('targetLost', event => {
        console.log("target lost");
      });
      //this.el.emit('targetFound');
    }
  });
});