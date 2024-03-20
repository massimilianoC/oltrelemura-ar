document.addEventListener("DOMContentLoaded", function() {

	const sceneEl = document.querySelector('a-scene');
    var entityBox = document.querySelector('#myobject');
	let arSystem;

	sceneEl.addEventListener('loaded', function () {
	  arSystem = sceneEl.systems["mindar-image-system"];
	});

	const example1 = document.querySelector('#example-1');

	const examplePlane1 = document.querySelector('#example-poster1');

	const startButton = document.querySelector("#debug-start-button");
	const stopButton = document.querySelector("#debug-stop-button");
	const pauseButton = document.querySelector("#debug-pause-button");
	const pauseKeepVideoButton = document.querySelector("#debug-pause-keep-video-button");
	const unpauseButton = document.querySelector("#debug-unpause-button");

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
	  console.log("event target found");
	});
	// detect target lost
	example1.addEventListener("targetLost", event => {
	  console.log("event target lost");
	});

	// detect click event
	examplePlane1.addEventListener("click", event => {
      var positionUpdate = document.querySelector("#example-poster1").object3D.position;
	  console.log(event);
      entityBox.setAttribute("position",positionUpdate)
	});
    


});