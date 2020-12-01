// Create your global variables below:
var tracklist = ["Cry Baby", "Dollhouse", "Carousel", "Soap", "Training Wheels", "Pity Party", "Milk and Cookies", "Mrs. Potato Head", "Alphabet Boy", "Mad Hatter"];
var volLevels = [];

var volume = 3;
var time = 0;
var isPlaying = false; 

var songIteration = 1;

function init() {
   
	for(var i = 0; i < 6; i++){
        volLevels[i] = document.getElementById("vl" + i);
    }
    // set colors of volume bars
    for(var i = 0; i < volume; i++){
        volLevels[i].style.backgroundColor = "#9f5cc4";
    }
}

function volUp() {
	document.getElementById("vl" + volume).style.backgroundColor = "#9f5cc4";
    if(volume == 5){ // if volume bars exceed limit, return
        return;
    }
    volume++; // else increment volume
}

function volDown() {
	document.getElementById("vl" + volume).style.backgroundColor = "white";
    if(volume==0){
        return;
    }
    volume --; // decrement volume
}

function switchPlay() {
    var playPause = document.getElementById("play-pause").innerHTML;
    if(playPause == "play_arrow"){ // if equal to play arrow
        // change to pause button
        document.getElementById("play-pause").innerHTML="pause";
    } else {
        // else change to play arrow
        document.getElementById("play-pause").innerHTML="play_arrow";
    }
}

function nextSong() {
    isPlaying = true;
    // have set to play arrow because of bug
    document.getElementById("play-pause").innerHTML = "<i class=\"material-icons\">play_arrow</i>";
    var songName = document.getElementById("player-song-name");
    if(songIteration == 9){ // if at the end of the song arrow
        songIteration = 0; // start back at the beginning
    } else {
        songIteration++; // else increment
    }
    var songNewName = tracklist[songIteration];
    songName.innerText = songNewName;
}

function prevSong() {
    isPlaying = true;
    // have set to play_arrow because of bug 
    document.getElementById("play-pause").innerHTML = "<i class=\"material-icons\">play_arrow</i>";
    var songName = document.getElementById("player-song-name");
    if(songIteration == 0){ // if at the beginning 
        songIteration = 9; // set back at the end
    } else {
        songIteration--; // else decrement
    }
    var songNewName = tracklist[songIteration];
    songName.innerText = songNewName;
}


function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

function updateTime() {
    if(isPlaying == true){
        isPlaying = false;
        document.getElementById("player-time").value = 0; // set value of to 0
        document.getElementById("time-elapsed").innerHTML = secondsToMs(0);
        document.getElementById("time-total").innerHTML = secondsToMs(180);
    } else {
        var finalTime;
        if(document.getElementById("play-pause").innerHTML == "pause"){
            // use the value of player-time id and parseInt function
             finalTime = parseInt(document.getElementById("player-time").value) + parseInt(1);
            
            if(finalTime > 180){ // if the final time of the song > 180
                finalTime = 0; // reset
                nextSong(); // play next song
            }
        } else {
            // not working, suppose to keep the play button
            // showing when next/prev button pressed 
            finalTime = parseInt(document.getElementById("player-time").value);
        }
        
        document.getElementById("player-time").value = finalTime;
        document.getElementById("time-elapsed").innerHTML = secondsToMs(finalTime);
        document.getElementById("time-total").innerHTML = secondsToMs(180-finalTime);
        // set time total by 180-finalTime 
    }
}
init();
setInterval(updateTime, 1000);
