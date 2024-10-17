import { useCallback, useEffect, useRef} from 'react';

function EcouteDB({ updateDecibel, updateMaxDecibel, setAudioAuthorized }: { updateDecibel: (decibels: number) => void; updateMaxDecibel: (maxDecibel: number) => void; setAudioAuthorized: (audioAuthorized: boolean) => void }) {
  
  let maxDecibel = 0;
  const interval = useRef<number>();
  const analyserRef = useRef<AnalyserNode | null>(null);

  const calculateDecibels = useCallback( () => {
    const analyser = analyserRef.current;

    if(!analyser) {
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
    const decibels = averageAmplitude > 0 ? 20 * Math.log10(averageAmplitude / reference) : -Infinity;

    console.log("Decibels: ");

    // Utiliser setValue (qui est setDecibel dans le parent) pour mettre à jour l'état dans App.js
    updateDecibel(decibels);

    // Mettre à jour le max des décibels dans le composant enfant
    if (decibels > maxDecibel) {
      
      maxDecibel = decibels; // Mettre à jour maxDecibel
      updateMaxDecibel(maxDecibel); // Appeler la fonction pour mettre à jour le max
    }
  }, [updateDecibel, updateMaxDecibel]);

  const defineAnalyser = useCallback(async () => {

    try{
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    

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

    analyserRef.current = analyser;

    setAudioAuthorized(true);

    }
    catch(err){
      console.error("Error accessing the microphone: ", err);
      setAudioAuthorized(false);
    }
   
  },[]);

  useEffect(() => {
    defineAnalyser().then(() => {
      console.log("Analyser defined");
      clearInterval(interval.current);
      interval.current = window.setInterval(calculateDecibels, 20);
    });
    return () => {
      console.log("Clearing interval", interval.current);
        clearInterval(interval.current);
      
    }
  }, []); // Ajout de setValue comme dépendance

  return null;
}


export default EcouteDB;