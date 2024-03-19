document.addEventListener("DOMContentLoaded", function() {

	const sceneEl = document.querySelector('a-scene');
    var entityBox = document.querySelector('#myobject');
	let arSystem;

	sceneEl.addEventListener('loaded', function () {
	  arSystem = sceneEl.systems["mindar-image-system"];
	});

	const example1 = document.querySelector('#example-1');
    const example2 = document.querySelector('#example-2');
	const examplePlane1 = document.querySelector('#example-plane1');
    const examplePlane2 = document.querySelector('#example-plane2');
	const startButton = document.querySelector("#example-start-button");
	const stopButton = document.querySelector("#example-stop-button");
	const pauseButton = document.querySelector("#example-pause-button");
	const pauseKeepVideoButton = document.querySelector("#example-pause-keep-video-button");
	const unpauseButton = document.querySelector("#example-unpause-button");

	startButton.addEventListener('click', () => {
	  console.log("start");
	  arSystem.start(); // start AR 
	});
	stopButton.addEventListener('click', () => {
	  arSystem.stop(); // stop AR 
	});
	pauseButton.addEventListener('click', () => {
	  arSystem.pause(); // pause AR, pause video
	});
	pauseKeepVideoButton.addEventListener('click', () => {
	  arSystem.pause(true); // pause AR, keep video
	});
	unpauseButton.addEventListener('click', () => {
	  arSystem.unpause(); // unpause AR and video
	});
	// arReady event triggered when ready
	sceneEl.addEventListener("arReady", (event) => {
	  // console.log("MindAR is ready")
	});
	// arError event triggered when something went wrong. Mostly browser compatbility issue
	sceneEl.addEventListener("arError", (event) => {
	  // console.log("MindAR failed to start")
	});
	// detect target found
	example1.addEventListener("targetFound", event => {
	  console.log("target found");
	});
	// detect target lost
	example1.addEventListener("targetLost", event => {
	  console.log("target lost");
	});

	// detect click event
	examplePlane1.addEventListener("click", event => {
      var positionUpdate = document.querySelector("#example-1").object3D.position;
	  console.log(event);
      entityBox.setAttribute("position",positionUpdate)
	});
    
    examplePlane2.addEventListener("click", event => {
      var positionUpdate = document.querySelector("#example-2").object3D.position;
	  console.log(event);
      entityBox.setAttribute("position",positionUpdate)
	});


});