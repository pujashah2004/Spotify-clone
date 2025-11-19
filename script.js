console.log("Welcome to Spotify Clone");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

// Songs array
let songs = [
    { songName: "Salam-e-Ishq", filePath: "songs/1.mp3", coverPath: "cover/1.jpg" },
    { songName: "Let Me Love You", filePath: "songs/2.mp3", coverPath: "cover/2.jpg" },
    { songName: "Shape of You", filePath: "songs/3.mp3", coverPath: "cover/3.jpg" },
    { songName: "Despacito", filePath: "songs/4.mp3", coverPath: "cover/4.jpg" },
    { songName: "Faded", filePath: "songs/5.mp3", coverPath: "cover/5.jpg" },
    { songName: "Believer", filePath: "songs/6.mp3", coverPath: "cover/6.jpg" },
    { songName: "Alone", filePath: "songs/7.mp3", coverPath: "cover/7.jpg" },
    { songName: "Cheap Thrills", filePath: "songs/8.mp3", coverPath: "cover/8.jpg" },
    { songName: "Girls Like You", filePath: "songs/9.mp3", coverPath: "cover/9.jpg" },
    { songName: "Senorita", filePath: "songs/10.mp3", coverPath: "cover/10.jpg" }
];

// Load songs into list dynamically
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Highlight the currently playing song
const highlightPlaying = (index) => {
    songItems.forEach((item, i) => {
        item.style.backgroundColor = i === index ? "#444" : "#fff";
        item.getElementsByClassName("songName")[0].style.color = i === index ? "#fff" : "#000";
    });
};

// Play/Pause master button
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
        gif.style.opacity = 1;
        highlightPlaying(songIndex);
    } else {
        audioElement.pause();
        masterPlay.classList.replace("fa-pause-circle", "fa-play-circle");
        gif.style.opacity = 0;
    }
});

// Update progress bar
audioElement.addEventListener("timeupdate", () => {
    if (!isNaN(audioElement.duration)) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
});

// Seek functionality
myProgressBar.addEventListener("input", () => {
    if (!isNaN(audioElement.duration)) {
        audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
    }
});

// Reset all play buttons in the list
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.replace("fa-pause-circle", "fa-play-circle");
    });
};

// Play song from list
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, i) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.replace("fa-play-circle", "fa-pause-circle");
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
        highlightPlaying(songIndex);
    });
});

// Next button
document.getElementById("next").addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
    highlightPlaying(songIndex);
});

// Previous button
document.getElementById("previous").addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
    highlightPlaying(songIndex);
});

// Auto-play next song when current ends
audioElement.addEventListener("ended", () => {
    document.getElementById("next").click();
});
