import { useCallback, useEffect, useRef } from "react";

function EcouteDB({
  updateDecibel,
  setAudioAuthorized,
}: {
  updateDecibel: (decibels: number) => void;
  setAudioAuthorized: (audioAuthorized: boolean) => void;
}) {
  const interval = useRef<number>();
  const analyserRef = useRef<AnalyserNode | null>(null);

  const calculateDecibels = useCallback(() => {
    const analyser = analyserRef.current;

    if (!analyser) {
      return;
    }

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteFrequencyData(dataArray);
    let total = 0;

    for (let i = 0; i < dataArray.length; i++) {
      total += dataArray[i];
    }

    const averageAmplitude = total / dataArray.length;
    const reference = 1;
    const decibels =
      averageAmplitude > 0
        ? 20 * Math.log10(averageAmplitude / reference)
        : -Infinity;

    // Utiliser setValue (qui est setDecibel dans le parent) pour mettre à jour l'état dans App.js
    updateDecibel(decibels);
    // Mettre à jour le max des décibels dans le composant enfant
  }, [updateDecibel]);

  const defineAnalyser = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const audioContext = new (window.AudioContext || window.AudioContext)();
      const source = audioContext.createMediaStreamSource(stream);

      const biquadFilter = audioContext.createBiquadFilter();
      biquadFilter.type = "bandpass";
      biquadFilter.frequency.value = 1000;
      biquadFilter.Q.value = 1.0;

      source.connect(biquadFilter);

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      biquadFilter.connect(analyser);

      analyserRef.current = analyser;

      setAudioAuthorized(true);
    } catch (err) {
      console.error("Error accessing the microphone: ", err);
      setAudioAuthorized(false);
    }
  }, []);

  useEffect(() => {
    defineAnalyser().then(() => {
      clearInterval(interval.current);
      interval.current = window.setInterval(calculateDecibels, 20);
    });
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return null;
}

export default EcouteDB;
