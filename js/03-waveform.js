const BARS_AUDIO_PATH = "/audio/System-Of-A-Down-Sugar-(Official-HD-Video)-(1).mp3"
let song;
let fft;
let time = 0;

function preload() {
    soundFormats("mp3");
    song = loadSound(BARS_AUDIO_PATH);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    fft = new p5.FFT(0.8, 256);
    fft.setInput(song);
    noFill();
}

function draw() {
    background(0);
    const spectrum = fft.analyze();
    
    // Divide spectrum into 4 frequency bands
    const quarterSize = spectrum.length / 4;
    
    // Bass (lowest frequencies)
    const bass = spectrum.slice(0, quarterSize);
    
    // Lows
    const lows = spectrum.slice(quarterSize, quarterSize * 2);
    
    // Mids
    const mids = spectrum.slice(quarterSize * 2, quarterSize * 3);
    
    // Highs
    const highs = spectrum.slice(quarterSize * 3);
    
    strokeWeight(2);
    
    // Draw all 4 waves overlapping at same center - higher up
    stroke(0, 255, 0, 200);
    drawAggressiveWave(bass, height * 0.2);
    
    stroke(0, 255, 0, 150);
    drawAggressiveWave(lows, height * 0.2);
    
    stroke(0, 255, 0, 100);
    drawAggressiveWave(mids, height * 0.2);
    
    time += 0.05;
}

function drawAggressiveWave(frequencyBand, yOffset) {
    beginShape();
    
    for (let x = 0; x < width; x += 2) {
        // Map x position to frequency band index
        const bandIndex = floor(map(x, 0, width, 0, frequencyBand.length - 1));
        const freqValue = frequencyBand[bandIndex];
        
        // Use actual frequency data - removed time component for no horizontal movement
        let y = yOffset + sin(x * 0.02) * (freqValue * 1) + (freqValue * 0.5);
        
        // Water pushing effect - if mouse is near, push the wave away
        const distance = dist(x, y, mouseX, mouseY);
        const pushRadius = 200;
        
        if (distance < pushRadius) {
            const pushForce = map(distance, 0, pushRadius, 80, 0);
            const angle = atan2(y - mouseY, x - mouseX);
            y += cos(angle) * pushForce;
        }
        
        vertex(x, y);
    }
    
    endShape();
}

function mousePressed() {
    userStartAudio();
    
    if (song.isLoaded()) {
        if (song.isPlaying()) {
            song.pause();
        } else {
            song.play();
        }
    }
}