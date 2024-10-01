import { useEffect, useState } from 'react';

function EcouteDB({ updateDecibel, updateMaxDecibel }: { updateDecibel: (decibels: number) => void; updateMaxDecibel: (maxDecibel: number) => void }) {
  
  let maxDecibel = 0;

  function ecoute(){

    navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      const audioContext = new (window.AudioContext || window.AudioContext)();
      const source = audioContext.createMediaStreamSource(stream);

      const biquadFilter = audioContext.createBiquadFilter();
      biquadFilter.type = 'bandpass';
      biquadFilter.frequency.value = 1000;
      biquadFilter.Q.value = 1.0;

      source.connect(biquadFilter);

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      biquadFilter.connect(analyser);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      function calculateDecibels() {
        analyser.getByteFrequencyData(dataArray);
        let total = 0;

        for (let i = 0; i < dataArray.length; i++) {
          total += dataArray[i];
        }

        const averageAmplitude = total / dataArray.length;
        const reference = 1;
        const decibels = averageAmplitude > 0 ? 20 * Math.log10(averageAmplitude / reference) : -Infinity;



        // Utiliser setValue (qui est setDecibel dans le parent) pour mettre à jour l'état dans App.js
        updateDecibel(decibels);

        // Mettre à jour le max des décibels dans le composant enfant
        if (decibels > maxDecibel) {
          maxDecibel = decibels; // Mettre à jour maxDecibel
          updateMaxDecibel(maxDecibel); // Appeler la fonction pour mettre à jour le max
        }

        requestAnimationFrame(calculateDecibels);
      }

      calculateDecibels();
    })
    .catch((err) => {
      console.error("Error accessing the microphone: ", err);
    });
  }

  useEffect(() => {
    ecoute();
  }, [updateDecibel]); // Ajout de setValue comme dépendance
}

export default EcouteDB;