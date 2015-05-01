window.addEventListener('load', function(){

	var videoDiv = document.getElementById('videoDiv');
	var videoPlayer = document.getElementById('videoPlayer');
	var playButton = document.getElementById('playButton');
	var fullscreenButton = document.getElementById('fullscreenButton');
	var forwardButton = document.getElementById('forwardButton');
	var backward = document.getElementById('backwardButton');
	var next = document.getElementById('nextButton');	
	var previous = document.getElementById('previousButton');
	var progressBar = document.getElementById('progressBar');
	var progress = document.getElementById('progress');

	var video = new Array();
	video[0] = 'video/Hiking.mp4';
	video[1] = 'video/Leaf.mp4';
	video[2] = 'video/Stream.mp4';
	var currentVideo = 0;


	videoPlayer.setAttribute("src", video[currentVideo]);
	videoPlayer.load();
	videoPlayer.addEventListener('canplay',function(){});
	
	nextButton.addEventListener('click', function(){
	 	if(currentVideo < video.length-1){
	 		currentVideo++;
			videoPlayer.setAttribute("src", video[currentVideo]);	 	
	 		videoPlayer.load();
	 		playButton.innerHTML = '<i class="fa fa-play">';
	 	}
	});
	previousButton.addEventListener('click', function(){
		if(currentVideo > 0){
			currentVideo--;
			videoPlayer.setAttribute("src", video[currentVideo]);	 	
	 		videoPlayer.load();
	 		playButton.innerHTML = '<i class="fa fa-play">';
		}
	});


	function setProgress(){
		progress.style.width =  videoPlayer.currentTime/videoPlayer.duration*100 + '%';
	}

	progressBar.addEventListener('click', function(e){
		mouseX = e.clientX - progress.offsetLeft;
		calcX = mouseX/progressBar.offsetWidth*100;

		timeToSet = calcX/100*videoPlayer.duration; 

		videoPlayer.currentTime = timeToSet;
		setProgress();

	});

	fullscreenButton.addEventListener('click', function(){
		if(videoPlayer.requestFullScreen) {
	        videoDiv.classList.add("fullScreenMode");
	        videoDiv.requestFullScreen();
	    } else if (videoPlayer.webkitRequestFullScreen) {
	        videoDiv.classList.add("fullScreenMode");
	        videoDiv.webkitRequestFullScreen();
	    } else if (videoPlayer.mozRequestFullScreen) {
	        videoDiv.classList.add("fullScreenMode");
	        videoDiv.mozRequestFullScreen();
	    }
    })

	playButton.addEventListener('click', function(){
		if(videoPlayer.paused){
				videoPlayer.play();
				playButton.innerHTML = '<i class="fa fa-pause">';
				var interval = setInterval(function () {
					setProgress();
				}, 25);

		} else {
				videoPlayer.pause();
				playButton.innerHTML = '<i class="fa fa-play">';
				clearInterval(interval);
		}
	});

	forwardButton.addEventListener('click', function(){
		timeForward = videoPlayer.duration/100*5;
		timeToForward = videoPlayer.currentTime+timeForward;

		if(timeToForward > videoPlayer.duration){
			videoPlayer.currentTime = videoPlayer.duration;
			setProgress();
		} else {
			videoPlayer.currentTime = timeToForward;
			setProgress();
		}
	});

	backward.addEventListener('click', function(){
		timeBackward = videoPlayer.duration/100*5;
		timeToBackward = videoPlayer.currentTime-timeBackward;

		if(timeToBackward < 0 ){
			videoPlayer.currentTime = 0;
			setProgress();
		} else {
			videoPlayer.currentTime = timeToBackward;
			setProgress();
		}
	});


});
