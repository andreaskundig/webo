const start = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();
  let wave = audioCtx.createPeriodicWave(wavetable.real, wavetable.imag);

    const playSweep = () =>{
        let osc = audioCtx.createOscillator();
        osc.type='sine';
        // osc.setPeriodicWave(wave);
        osc.frequency.value = 440;
        osc.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1/2);
    };

    window.p = playSweep;
};
