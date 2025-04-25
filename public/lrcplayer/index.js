const audioInput = document.getElementById('audioInput');
const playButton = document.getElementById('playButton');
const container = document.getElementById('container');
const lrcInput = document.getElementById('lrcInput');
const lrcDisplay = document.getElementById('lyrics');
let inputLyrics = false;
let inputAudio = false;
let audio = new Audio();
let lyrics = [];

audioInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        inputAudio = true;
        audio.src = URL.createObjectURL(file);
    }
});

lrcInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        inputLyrics = true;
        const reader = new FileReader();
        reader.onload = function (event) {
            lyrics = event.target.result.split('\n');
        };
        reader.readAsText(file);
    }
});

let playing = false;
playButton.addEventListener('click', () => {
    if (inputAudio && inputLyrics && !playing) {
        playing = true;
        lrcDisplay.style.display = 'block';
        container.style.display = 'none';
        document.body.requestFullscreen();
        audio.play();
        for (let i = 0; i < lyrics.length; i++) {
            const match = lyrics[i].trim().match(/\[(\d+):(\d+\.\d+)\](.*)/);
            if (match) {
                setTimeout(() => {
                    lrcDisplay.innerHTML = match[3].trim().toLowerCase();
                }, (parseInt(match[1], 10) * 60 + parseFloat(match[2])) * 1000);
            };
        };
        audio.addEventListener('ended', () => {
            document.exitFullscreen();
            window.location.reload();
        }, { once: true });
    };
});