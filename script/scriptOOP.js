var Video = function(){

	this.videoDiv = document.getElementById('videoDiv');
	this.videoPlayer = document.getElementById('videoPlayer');
	this.playButton = document.getElementById('playButton');
	this.fullscreenButton = document.getElementById('fullscreenButton');
	this.forwardButton = document.getElementById('forwardButton');
	this.backward = document.getElementById('backwardButton');
	this.next = document.getElementById('nextButton');	
	this.previous = document.getElementById('previousButton');
	this.progressBar = document.getElementById('progressBar');
	this.progress = document.getElementById('progress');

	this.currentVideo = 0;
	this.videos = '{ "video": [' +
		'{ "src":"video/Hiking.mp4", "title":"Hiking" },'+
		'{ "src":"video/Leaf.mp4", "title":"Leaf" },'+
		'{ "src":"video/Stream.mp4", "title":"Stream" } ]}';

	this.videoList = JSON.parse(this.videos);	

	this.playlist = document.getElementById('playlist');
	this.playlistButtons = document.getElementsByClassName('playlistButtons');
}


Video.prototype.setProgress = function()
{
	this.progress.style.width =  this.videoPlayer.currentTime/this.videoPlayer.duration*100 + '%';
}

Video.prototype.onEnded = function()
{
	if(this.currentVideo < this.videoList.video.length-1){
	 	this.currentVideo++;
		this.videoPlayer.setAttribute("src", this.videoList.video[this.currentVideo].src);	 	
	 	this.videoPlayer.load();
	 	this.playButton.innerHTML = '<i class="fa fa-play">';
	}
}

Video.prototype.setVideo = function()
{
	this.videoPlayer.setAttribute("src", this.videoList.video[this.currentVideo].src);
	this.videoPlayer.load();
	this.videoPlayer.addEventListener('canplay',function(){});
}

Video.prototype.nextVideo = function()
{
	if(this.currentVideo < this.videoList.video.length-1){
	 	this.currentVideo++;
		this.videoPlayer.setAttribute("src", this.videoList.video[this.currentVideo].src);	 	
	 	this.videoPlayer.load();
	 	this.playButton.innerHTML = '<i class="fa fa-play">';
	}
}
Video.prototype.previousVideo = function()
{
	if(this.currentVideo > 0){
		this.currentVideo--;
		this.videoPlayer.setAttribute("src", this.videoList.video[this.currentVideo].src);	 	
 		this.videoPlayer.load();
 		this.playButton.innerHTML = '<i class="fa fa-play">';
	}
}
Video.prototype.playVideo = function()
{
	var self = this;
	if(this.videoPlayer.paused){
			this.videoPlayer.play();
			this.playButton.innerHTML = '<i class="fa fa-pause">';
			var interval = setInterval(function () {
				self.setProgress();
			}, 25);

	} else {
			this.videoPlayer.pause();
			this.playButton.innerHTML = '<i class="fa fa-play">';
			clearInterval(interval);
	}
}
Video.prototype.forwardVideo = function()
{
	timeForward = this.videoPlayer.duration / 100 * 5;
	timeToForward = this.videoPlayer.currentTime + timeForward;

	if(timeToForward > videoPlayer.duration){
		this.videoPlayer.currentTime = videoPlayer.duration;
		this.setProgress();
	} else {
		this.videoPlayer.currentTime = timeToForward;
		this.setProgress();
	}
}
Video.prototype.backwardVideo = function()
{
	timeBackward = this.videoPlayer.duration / 100 * 5;
	timeToBackward = this.videoPlayer.currentTime - timeBackward;

	if(timeToBackward < 0 ){
		this.videoPlayer.currentTime = 0;
		this.setProgress();
	} else {
		this.videoPlayer.currentTime = timeToBackward;
		this.setProgress();
	}
}
Video.prototype.fullscreenVideo = function()
{
	if(this.videoPlayer.requestFullScreen) {
        this.videoDiv.requestFullScreen();
    } else if (this.videoPlayer.webkitRequestFullScreen) {
        this.videoDiv.webkitRequestFullScreen();
    } else if (this.videoPlayer.mozRequestFullScreen) {
        this.videoDiv.mozRequestFullScreen();
    }	
}
Video.prototype.progressbarVideo = function(e)
{
	mouseX = e.clientX - this.progress.offsetLeft;
	calcX = mouseX/this.progressBar.offsetWidth*100;

	timeToSet = calcX/100*this.videoPlayer.duration; 

	this.videoPlayer.currentTime = timeToSet;
	this.setProgress();
}
Video.prototype.makePlaylist = function()
{
	for(i = 0;i<this.videoList.video.length; i++)
	{
		this.playlist.innerHTML = this.playlist.innerHTML + '<a class="playlistButtons" id="videoID' + i + '" href="' + i + '"<h1>' + this.videoList.video[i].title + '</h1></a>';
	}
	for(var i=0;i<this.playlistButtons.length;i++){
        this.playlistButtons[i].addEventListener('click', function(e){ e.preventDefault(); firstPlayer.goToVideo(this); });
    }
}
Video.prototype.goToVideo = function(e)
{
	var attribute = e.getAttribute('href');
	this.currentVideo = this.currentVideo + attribute;
	this.videoPlayer.setAttribute("src", this.videoList.video[attribute].src);
	this.videoPlayer.load();
 	this.playButton.innerHTML = '<i class="fa fa-play">';	 	
}



var firstPlayer = new Video();

firstPlayer.setVideo();
firstPlayer.makePlaylist();

this.playButton.addEventListener('click', function(){ firstPlayer.playVideo(); });
this.nextButton.addEventListener('click', function(){ firstPlayer.nextVideo(); });
this.previousButton.addEventListener('click', function(){ firstPlayer.previousVideo(); });
this.forwardButton.addEventListener('click', function(){ firstPlayer.forwardVideo(); });
this.backwardButton.addEventListener('click', function(){ firstPlayer.backwardVideo(); });
this.fullscreenButton.addEventListener('click', function(){ firstPlayer.fullscreenVideo(); });
this.progressBar.addEventListener('click', function(e){ firstPlayer.progressbarVideo(e); });
this.videoPlayer.addEventListener("ended", function(){ firstPlayer.onEnded(); });
