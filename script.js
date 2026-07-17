// script.js - Updated with your actual song filenames!

const playlist = [
    {
        audio: 'audio/song 1 - kesariya.mp3',
        image: 'images/pic 1.jpg',
        message: "This is my favorite recording of you. Your voice is so pure and beautiful here! ❤️"
    },
    {
        audio: 'audio/song 2 - qaafirana.mp3',
        image: 'images/pic 2.jpg',
        message: "The way you hit these notes completely took my breath away. Never doubt yourself. ✨"
    },
    {
        audio: 'audio/song 3 - tum ho toh.mp3',
        image: 'images/pic 3.jpg',
        message: "I love this memory so much, but I love your voice in the background even more. 😘"
    },
    {
        audio: 'audio/song 4 - number one girl.mp3',
        image: 'images/pic 4.jpg',
        message: "A quick reminder that you sing better than anyone I know. Truly. 🦋"
    },
    {
        audio: 'audio/song 5 - taake olpo kachhe dakchhi.mp3',
        image: 'images/pic 5.jpg',
        message: "This song makes me feel so close to you. Your voice is my favorite sound. 🌸"
    },
    {
        audio: 'audio/song 6 - ei bhalo ei kharap.mp3',
        image: 'images/pic 6.jpg',
        message: "I could listen to you sing this on repeat forever and never get tired of it. ❤️"
    },
    {
        audio: 'audio/song 7 - baundule ghuri.mp3',
        image: 'images/pic 7.jpg',
        message: "Your voice is a gift, and I am so incredibly lucky to be the one you sing to. 🥰"
    }
];

// DOM SELECTORS
const hearts = document.querySelectorAll('.heart');
const audioPlayer = document.getElementById('main-audio');
const cssCassette = document.getElementById('css-cassette');
const cassettePolaroid = document.getElementById('cassette-polaroid');
const displayWindow = document.getElementById('display-window');
const polaroidImage = document.getElementById('polaroid-image');
const polaroidMessage = document.getElementById('polaroid-message');
const sceneContainer = document.getElementById('scene-container');
const controlsPanel = document.getElementById('controls-panel');
const btnPlayPause = document.getElementById('btn-play-pause');

let currentlyPlayingIndex = null;
let isPaused = false;

// HEART CLICK TRIGGERS
hearts.forEach((heart, index) => {
    heart.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (currentlyPlayingIndex === index) {
            togglePlayPause();
            return;
        }

        releaseButterfly(e.clientX, e.clientY, index);
    });
});

// BUTTERFLY FLOATING TO THE CASSETTE
function releaseButterfly(startX, startY, trackIndex) {
    const butterfly = document.createElement('div');
    butterfly.innerHTML = '🦋';
    butterfly.style.position = 'absolute';
    butterfly.style.left = `${startX}px`;
    butterfly.style.top = `${startY}px`;
    butterfly.style.fontSize = '28px';
    butterfly.style.pointerEvents = 'none';
    butterfly.style.zIndex = '999';
    butterfly.style.transition = 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
    
    sceneContainer.appendChild(butterfly);

    // Get the exact center coordinates of the player deck
    const playerRect = document.getElementById('player-deck').getBoundingClientRect();
    const targetX = playerRect.left + (playerRect.width / 2);
    const targetY = playerRect.top + (playerRect.height / 2);

    setTimeout(() => {
        butterfly.style.transform = 'scale(1.5) rotate(15deg)';
        butterfly.style.left = `${targetX - 14}px`;
        butterfly.style.top = `${targetY - 14}px`;
        butterfly.style.opacity = '0';
    }, 50);

    setTimeout(() => {
        butterfly.remove();
        playTrack(trackIndex);
    }, 1250);
}

// PLAY TRACK FUNCTION
function playTrack(index) {
    currentlyPlayingIndex = index;
    isPaused = false;
    const track = playlist[index];

    // Reset previous audio if playing
    audioPlayer.pause();
    
    // Explicitly set, encode space characters, and load audio
    audioPlayer.src = encodeURI(track.audio);
    audioPlayer.load();

    const playPromise = audioPlayer.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("Audio is playing perfectly!");
        }).catch(err => {
            console.error("Audio playback failed.", err);
            alert(`Oops! Browser can't find or load the audio file: "${track.audio}". Double-check your file names inside the 'audio' folder!`);
        });
    }

    // Toggle Window Views (Hide the spinning cassette body, reveal Polaroid inside window)
    cssCassette.classList.add('hidden');
    cssCassette.classList.remove('spinning');
    cassettePolaroid.classList.remove('hidden');

    // Load Polaroid details
    polaroidImage.src = track.image;
    polaroidMessage.innerText = track.message;
    
    // Update Indicators
    displayWindow.innerText = `NOW PLAYING: TRACK 0${index + 1}`;
    btnPlayPause.innerText = "⏸️ Pause";
    controlsPanel.classList.remove('hidden');
}

// PAUSE & RESUME TOGGLES
function togglePlayPause() {
    if (currentlyPlayingIndex === null) return;

    if (isPaused) {
        audioPlayer.play();
        displayWindow.innerText = `NOW PLAYING: TRACK 0${currentlyPlayingIndex + 1}`;
        btnPlayPause.innerText = "⏸️ Pause";
        isPaused = false;
    } else {
        audioPlayer.pause();
        displayWindow.innerText = "MUSIC BOX PAUSED";
        btnPlayPause.innerText = "▶️ Resume";
        isPaused = true;
    }
}

btnPlayPause.addEventListener('click', togglePlayPause);

// Track Reset when finished naturally
audioPlayer.addEventListener('ended', () => {
    displayWindow.innerText = "CHOOSE ANOTHER SONG ❤️";
    controlsPanel.classList.add('hidden');
    
    // Re-hide Polaroid, show CSS cassette tape again
    cassettePolaroid.classList.add('hidden');
    cssCassette.classList.remove('hidden');
    
    currentlyPlayingIndex = null;
    isPaused = false;
});