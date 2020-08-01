// file:///home/pi/work/webo/index.html
const oscillators = {};
let audioCtx = undefined;

const keyToFrequency = {a:440, b:660, c:880};

const createOsc = (frequency) => {
  initializeAudioContext();
  let osc = audioCtx.createOscillator();
  osc.type = 'sine';
  // osc.setPeriodicWave(wave);
  osc.frequency.value = frequency;
  osc.connect(audioCtx.destination);
  return osc;
};

const initializeAudioContext = () => {
  if(!audioCtx){
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
};

const start = () => {
  //let wave = audioCtx.createPeriodicWave(wavetable.real, wavetable.imag);
  const playSweep = () => {
    let osc1 = createOsc(440, audioCtx);
    let osc2 = createOsc(880, audioCtx);
    let now = audioCtx.currentTime;
    osc1.start();
    osc2.start();
    osc1.stop(now + 1);
    osc2.stop(now + 1);
  };

  window.p = playSweep;
};
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  start();
  document.addEventListener('keydown', event => {
    const  {key} = event;
    const oldOsc = oscillators[key];
    const frequency = keyToFrequency[key];
    if(oldOsc || !frequency) { return; }
    console.log('down', key);
    const newOsc = createOsc(frequency, audioCtx);
    newOsc.start();
    oscillators[key] = newOsc;
  });
  document.addEventListener('keyup', event => {
    const  {key} = event;
    const oldOsc = oscillators[key];
    if(!oldOsc){ return; }
    console.log('up', key);
    oldOsc.stop(audioCtx.now);
    delete oscillators[key];
  });
});
