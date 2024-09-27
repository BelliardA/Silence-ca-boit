import { useEffect, useState } from 'react';

function EcouteDB({ setValue }) {
  const [maxDecibels, setMaxDecibels] = useState(0);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
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
          setValue(decibels);

          // Mettre à jour le max des décibels dans le composant enfant
          setMaxDecibels((prevMax) => (decibels > prevMax ? decibels : prevMax));

          requestAnimationFrame(calculateDecibels);
        }

        calculateDecibels();
      })
      .catch((err) => {
        console.error("Error accessing the microphone: ", err);
      });
  }, [setValue]); // Ajout de setValue comme dépendance

  return (
    <div>
      <p>Max Décibels : {maxDecibels}</p>
    </div>
  );
}

export default EcouteDB;