const start = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();
  //let wave = audioCtx.createPeriodicWave(wavetable.real, wavetable.imag);
  const createOsc = (frequency, audioCtx) => {
    let osc = audioCtx.createOscillator();
    osc.type = 'sine';
    // osc.setPeriodicWave(wave);
    osc.frequency.value = frequency;
    osc.connect(audioCtx.destination);
    return osc;
  };
  const playSweep = () => {
    let osc1 = createOsc(440, audioCtx);
    let osc2 = createOsc(880, audioCtx);
    let now = audioCtx.currentTime;
    osc1.start();
    osc2.start();
    osc1.stop(now + 1 );
    osc2.stop(now + 1 );
    // osc1 = createOsc(440, audioCtx);
    // now = audioCtx.currentTime;
    // osc1.start();
    // osc1.stop(now + 1 );
    // osc2 = createOsc(880, audioCtx);
    // now = audioCtx.currentTime;
    // osc2.start();
    // osc2.stop(now + 1 );
  };

  window.p = playSweep;
};
